package kubes

import (
	"crypto/rand"
	"fmt"
	"github.com/xctf-io/xctf/pkg/util"
	corev1 "k8s.io/api/core/v1"
	networkingv1 "k8s.io/api/networking/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	"k8s.io/client-go/kubernetes"
	"math/big"
)

// GeneratePassword creates a random 16-character alphanumeric password
func GeneratePassword() string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	ret := make([]byte, 16)
	for i := 0; i < 16; i++ {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(letters))))
		ret[i] = letters[num.Int64()]
	}
	return string(ret)
}

// GenerateIngressRules creates ingress rules for the specified number of hosts
func GenerateIngressRules(clientset *kubernetes.Clientset, number int) {
	var rules []networkingv1.IngressRule
	for i := 0; i < number; i++ {
		rules = append(rules, networkingv1.IngressRule{
			Host: fmt.Sprintf("shell-%d.example.com", i),
			IngressRuleValue: networkingv1.IngressRuleValue{
				HTTP: &networkingv1.HTTPIngressRuleValue{
					Paths: []networkingv1.HTTPIngressPath{
						{
							Path:     fmt.Sprintf("/%d(/|$)(.*)", i),
							PathType: util.Ptr(networkingv1.PathTypeImplementationSpecific),
							Backend: networkingv1.IngressBackend{
								Service: &networkingv1.IngressServiceBackend{
									Name: fmt.Sprintf("shell-%d-svc", i),
									Port: networkingv1.ServiceBackendPort{
										Number: 80,
									},
								},
							},
						},
					},
				},
			},
		})
	}
}

func CreatePod(clientset *kubernetes.Clientset, name, password string) corev1.Pod {
	return corev1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: "shells",
			Labels:    map[string]string{"application": name},
		},
		Spec: corev1.PodSpec{
			Containers: []corev1.Container{
				{
					Name:  "headless-vnc",
					Image: "justluk/xfce-desktop",
					Env: []corev1.EnvVar{
						{
							Name:  "VNC_PW",
							Value: password,
						},
					},
				},
			},
		},
	}
}

func CreateService(clientset *kubernetes.Clientset, name string) corev1.Service {
	return corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      fmt.Sprintf("%s-svc", name),
			Namespace: "shells",
			Labels:    map[string]string{"application": name},
		},
		Spec: corev1.ServiceSpec{
			Ports: []corev1.ServicePort{
				{
					Name:       "http",
					Protocol:   corev1.ProtocolTCP,
					Port:       80,
					TargetPort: intstr.FromInt(6901),
				},
			},
			Selector: map[string]string{
				"application": name,
			},
			Type: corev1.ServiceTypeClusterIP,
		},
	}
}
