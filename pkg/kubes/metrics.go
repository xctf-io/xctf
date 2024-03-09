package kubes

import (
	"context"
	"fmt"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	metricsv1beta1 "k8s.io/metrics/pkg/apis/metrics/v1beta1"
	metrics "k8s.io/metrics/pkg/client/clientset/versioned"
)

func GetServicePodMetrics(clientset *kubernetes.Clientset, metricsClient *metrics.Clientset, namespace, serviceName string) (*metricsv1beta1.PodMetricsList, error) {
	// Get the service
	service, err := clientset.CoreV1().Services(namespace).Get(context.Background(), serviceName, metav1.GetOptions{})
	if err != nil {
		return nil, fmt.Errorf("error getting service: %v", err)
	}

	// Get the list of pods associated with the service
	labelSelector := metav1.FormatLabelSelector(&metav1.LabelSelector{MatchLabels: service.Spec.Selector})
	pods, err := clientset.CoreV1().Pods(namespace).List(context.Background(), metav1.ListOptions{LabelSelector: labelSelector})
	if err != nil {
		return nil, fmt.Errorf("error listing pods: %v", err)
	}

	// Fetch and aggregate metrics for each pod
	var podMetricsList metricsv1beta1.PodMetricsList
	for _, pod := range pods.Items {
		podMetrics, err := metricsClient.MetricsV1beta1().PodMetricses(namespace).Get(context.Background(), pod.Name, metav1.GetOptions{})
		if err != nil {
			fmt.Printf("Error fetching metrics for pod %s: %v\n", pod.Name, err)
			continue
		}
		podMetricsList.Items = append(podMetricsList.Items, *podMetrics)
	}

	return &podMetricsList, nil
}
