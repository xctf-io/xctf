package kubes

import (
	"fmt"
	"github.com/xctf-io/xctf/pkg/openai"
	"github.com/xctf-io/xctf/pkg/util"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func NewXCtfDeployment(container, name, configMapName string, port int32, oc openai.Config) *appsv1.Deployment {
	mountDir := "/config"          // Directory where the file will be mounted
	fileName := "gcs_account.json" // Name of the file in the ConfigMap
	mountPath := fmt.Sprintf("%s/%s", mountDir, fileName)

	volumes := []corev1.Volume{
		{
			Name: configMapName,
			VolumeSource: corev1.VolumeSource{
				ConfigMap: &corev1.ConfigMapVolumeSource{
					LocalObjectReference: corev1.LocalObjectReference{
						Name: configMapName,
					},
					Items: []corev1.KeyToPath{
						{
							Key:  fileName,
							Path: fileName,
						},
					},
				},
			},
		},
	}

	volumeMounts := []corev1.VolumeMount{
		{
			Name:      configMapName,
			MountPath: mountPath,
			SubPath:   fileName,
		},
	}
	return &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name: name,
			Labels: map[string]string{
				"app": name,
			},
			Annotations: map[string]string{},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: util.Ptr[int32](1),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"app": name,
				},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"app": name,
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
							Resources: corev1.ResourceRequirements{
								Requests: corev1.ResourceList{
									corev1.ResourceCPU:    resource.MustParse("500m"), // Request 0.5 CPU cores
									corev1.ResourceMemory: resource.MustParse("1Gi"),  // Request 1 GiB of memory
								},
								Limits: corev1.ResourceList{
									corev1.ResourceCPU:    resource.MustParse("1"),   // Limit to 1 CPU core
									corev1.ResourceMemory: resource.MustParse("2Gi"), // Limit to 2 GiB of memory
								},
							},
							Env: []corev1.EnvVar{
								{
									Name:  "PORT",
									Value: fmt.Sprintf("%d", port),
								},
								{
									Name:  "PROXY_URL",
									Value: "",
								},
								{
									Name:  "BACKUPS",
									Value: "true",
								},
								{
									Name:  "BACKUP_NAME",
									Value: name,
								},
								{
									// TODO breadchris open sub-bucket https://gocloud.dev/howto/blob/#prefix
									Name:  "BUCKET",
									Value: fmt.Sprintf("gs://xctf-backup/%s-upload", name),
								},
								{
									Name:  "GOOGLE_APPLICATION_CREDENTIALS",
									Value: mountPath,
								},
								{
									Name:  "OPENAI_API_KEY",
									Value: oc.APIKey,
								},
							},
							VolumeMounts: volumeMounts,
						},
					},
					Volumes: volumes,
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
