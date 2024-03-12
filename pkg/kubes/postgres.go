package kubes

import (
	"context"
	"fmt"
	"github.com/xctf-io/xctf/pkg/util"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	"k8s.io/client-go/kubernetes"
)

func deployToKubernetes(clientset *kubernetes.Clientset) error {
	deployment := &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name: "postgres",
			Labels: map[string]string{
				"io.kompose.service": "postgres",
			},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: util.Ptr(int32(1)),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"io.kompose.service": "postgres",
				},
			},
			Strategy: appsv1.DeploymentStrategy{
				Type: appsv1.RecreateDeploymentStrategyType,
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"io.kompose.service": "postgres",
					},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:  "postgres",
							Image: "postgres",
							Env: []corev1.EnvVar{
								{
									Name:  "PGDATA",
									Value: "/var/lib/postgresql/data/db",
								},
								{
									Name:  "POSTGRES_PASSWORD",
									Value: "password",
								},
							},
							Ports: []corev1.ContainerPort{
								{
									ContainerPort: 5432,
								},
							},
							VolumeMounts: []corev1.VolumeMount{
								{
									Name:      "db",
									MountPath: "/var/lib/postgresql/data/",
								},
							},
						},
					},
					Volumes: []corev1.Volume{
						{
							Name: "db",
							VolumeSource: corev1.VolumeSource{
								PersistentVolumeClaim: &corev1.PersistentVolumeClaimVolumeSource{
									ClaimName: "db",
								},
							},
						},
					},
				},
			},
		},
	}

	// Deploy the Deployment
	_, err := clientset.AppsV1().Deployments("default").Create(context.TODO(), deployment, metav1.CreateOptions{})
	if err != nil {
		return fmt.Errorf("error creating deployment: %v", err)
	}

	// Define the Service
	service := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name: "postgres",
			Labels: map[string]string{
				"io.kompose.service": "postgres",
			},
		},
		Spec: corev1.ServiceSpec{
			Ports: []corev1.ServicePort{
				{
					Name:       "5432",
					Port:       5432,
					TargetPort: intstr.FromInt(5432),
				},
			},
			Selector: map[string]string{
				"io.kompose.service": "postgres",
			},
			Type: corev1.ServiceTypeClusterIP,
		},
	}

	// Create the Service
	_, err = clientset.CoreV1().Services("default").Create(context.TODO(), service, metav1.CreateOptions{})
	if err != nil {
		return fmt.Errorf("error creating service: %v", err)
	}

	// Define the PersistentVolumeClaim
	pvc := &corev1.PersistentVolumeClaim{
		ObjectMeta: metav1.ObjectMeta{
			Name: "db",
			Labels: map[string]string{
				"io.kompose.service": "db",
			},
		},
		Spec: corev1.PersistentVolumeClaimSpec{
			AccessModes: []corev1.PersistentVolumeAccessMode{
				corev1.ReadWriteOnce,
			},
			Resources: corev1.VolumeResourceRequirements{
				Requests: corev1.ResourceList{
					corev1.ResourceStorage: resource.MustParse("100Mi"),
				},
			},
		},
	}

	// Create the PersistentVolumeClaim
	_, err = clientset.CoreV1().PersistentVolumeClaims("default").Create(context.TODO(), pvc, metav1.CreateOptions{})
	if err != nil {
		return fmt.Errorf("error creating persistent volume claim: %v", err)
	}

	return nil
}
