package kubes

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/google/wire"
	"github.com/xctf-io/xctf/gen/kubes"
	"github.com/xctf-io/xctf/gen/kubes/kubesconnect"
	networkingv1 "k8s.io/api/networking/v1"
	"path/filepath"
	"regexp"

	appsv1 "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

var ProviderSet = wire.NewSet(
	New,
	NewConfig,
)

type Service struct {
	c         Config
	clientSet *kubernetes.Clientset
}

var _ kubesconnect.KubesServiceHandler = (*Service)(nil)

func New(c Config) (*Service, error) {
	if !c.Enabled {
		return nil, nil
	}

	kubeconfig := filepath.Join(homedir.HomeDir(), ".kube", "config")

	// Build the configuration from the kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// Create a clientset for interacting with the Kubernetes cluster
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}
	return &Service{
		c:         c,
		clientSet: clientset,
	}, nil
}

func (s *Service) ListDeployments(ctx context.Context, c *connect.Request[kubes.ListDeploymentsRequest]) (*connect.Response[kubes.ListDeploymentsResponse], error) {
	deployments, err := s.deploymentsForNamespace(ctx, s.c.DefaultNamespace)
	if err != nil {
		return nil, err
	}

	var deploymentList []*kubes.Deployment
	for _, deployment := range deployments.Items {
		deploymentList = append(deploymentList, &kubes.Deployment{
			Id:        string(deployment.UID),
			Name:      deployment.Name,
			Namespace: deployment.Namespace,
			Image:     deployment.Spec.Template.Spec.Containers[0].Image,
			Replicas:  *deployment.Spec.Replicas,
			Status:    deployment.Status.String(),
		})
	}

	return connect.NewResponse(&kubes.ListDeploymentsResponse{
		Deployments: deploymentList,
	}), nil
}

func isValidK8sServiceName(name string) bool {
	if len(name) == 0 || len(name) > 63 {
		return false
	}

	// Kubernetes service names must conform to RFC 1123. This includes the DNS label standard,
	// which requires the name to consist of only lowercase alphanumeric characters or '-',
	// and must start and end with an alphanumeric character.
	match, _ := regexp.MatchString("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$", name)

	return match
}

func (s *Service) NewDeployment(ctx context.Context, c *connect.Request[kubes.NewDeploymentRequest]) (*connect.Response[kubes.NewDeploymentResponse], error) {
	port := int32(80)
	name := fmt.Sprintf("%s-xctf", c.Msg.Name)
	if !isValidK8sServiceName(name) {
		return nil, fmt.Errorf("invalid service name: %s", name)
	}

	_, err := s.newDeployment(ctx, s.c.DefaultNamespace, NewXCtfDeployment(s.c.Container, name, port))
	if err != nil {
		return nil, err
	}

	// TODO breadchris how should this be managed?
	challengeIngress := "xctf-ingress"
	domainBase := "nicek12.xctf.io"

	domain := fmt.Sprintf("%s.%s", name, domainBase)

	err = s.updateIngress(ctx, s.c.DefaultNamespace, challengeIngress, NewIngressRule(domain, name, port))
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&kubes.NewDeploymentResponse{}), nil
}

func (s *Service) deleteDeployment(clientset *kubernetes.Clientset, namespace string, deploymentName string) error {
	deletePolicy := metav1.DeletePropagationForeground
	return clientset.AppsV1().Deployments(namespace).Delete(context.TODO(), deploymentName, metav1.DeleteOptions{
		PropagationPolicy: &deletePolicy,
	})
}

func (s *Service) deploymentsForNamespace(ctx context.Context, namespace string) (*appsv1.DeploymentList, error) {
	deploymentsClient := s.clientSet.AppsV1().Deployments(namespace)
	return deploymentsClient.List(ctx, metav1.ListOptions{})
}

func (s *Service) newDeployment(ctx context.Context, namespace string, deployment *appsv1.Deployment) (*appsv1.Deployment, error) {
	deploymentsClient := s.clientSet.AppsV1().Deployments(namespace)
	return deploymentsClient.Create(ctx, deployment, metav1.CreateOptions{})
}

func (s *Service) updateIngress(ctx context.Context, namespace, ingressName string, ingressRule *networkingv1.IngressRule) error {
	ingress, err := s.clientSet.NetworkingV1().Ingresses(namespace).Get(ctx, ingressName, metav1.GetOptions{})
	if err != nil {
		return err
	}
	ingress.Spec.Rules = append(ingress.Spec.Rules, *ingressRule)
	_, err = s.clientSet.NetworkingV1().Ingresses(namespace).Update(ctx, ingress, metav1.UpdateOptions{})
	return err
}
