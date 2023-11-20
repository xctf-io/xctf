package kubes

import (
	"context"
	"github.com/bufbuild/connect-go"
	"github.com/xctf-io/xctf/gen/kubes"
	"github.com/xctf-io/xctf/gen/kubes/kubesconnect"
	"path/filepath"

	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

type Service struct {
	clientSet *kubernetes.Clientset
}

var _ kubesconnect.KubesServiceHandler = (*Service)(nil)

func NewService() (*Service, error) {
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
		clientSet: clientset,
	}, nil
}

func (s *Service) ListDeployments(ctx context.Context, c *connect.Request[kubes.ListDeploymentsRequest]) (*connect.Response[kubes.ListDeploymentsResponse], error) {
	deployments, err := s.deploymentsForNamespace(ctx, c.Msg.Namespace)
	if err != nil {
		return nil, err
	}

	var deploymentList []*kubes.Deployment
	for _, deployment := range deployments.Items {
		deploymentList = append(deploymentList, &kubes.Deployment{
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

func (s *Service) NewDeployment(ctx context.Context, c *connect.Request[kubes.NewDeploymentRequest]) (*connect.Response[kubes.NewDeploymentResponse], error) {
	deployment := &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      c.Msg.Name,
			Namespace: c.Msg.Namespace,
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: &c.Msg.Replicas,
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"app": c.Msg.Name,
				},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": c.Msg.Name},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:  c.Msg.Name,
							Image: c.Msg.Image,
						},
					},
				},
			},
		},
	}

	_, err := s.newDeployment(ctx, c.Msg.Namespace, deployment)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&kubes.NewDeploymentResponse{}), nil
}

func (s *Service) deploymentsForNamespace(ctx context.Context, namespace string) (*appsv1.DeploymentList, error) {
	deploymentsClient := s.clientSet.AppsV1().Deployments(namespace)
	return deploymentsClient.List(ctx, metav1.ListOptions{})
}

func (s *Service) newDeployment(ctx context.Context, namespace string, deployment *appsv1.Deployment) (*appsv1.Deployment, error) {
	deploymentsClient := s.clientSet.AppsV1().Deployments(namespace)
	return deploymentsClient.Create(ctx, deployment, metav1.CreateOptions{})
}
