package kubes

import (
	"fmt"
	"github.com/xctf-io/xctf/pkg/util"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func NewXCtfDeployment(container, name string, port int32) *appsv1.Deployment {
	return &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name: name,
			Labels: map[string]string{
				"io.kompose.service": name,
			},
			Annotations: map[string]string{},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: util.Ptr[int32](1),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"io.kompose.service": name,
				},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"io.kompose.network/xctf-default": "true",
						"io.kompose.service":              name,
					},
					Annotations: map[string]string{},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:  "xctf",
							Image: container,
							Ports: []corev1.ContainerPort{
								{
									ContainerPort: port,
								},
							},
							Env: []corev1.EnvVar{
								{
									Name:  "PORT",
									Value: fmt.Sprintf("%d", port),
								},
							},
						},
					},
					ImagePullSecrets: []corev1.LocalObjectReference{
						{
							Name: "ghcr-pull-secret",
						},
					},
					RestartPolicy: corev1.RestartPolicyAlways,
				},
			},
		},
	}
}
