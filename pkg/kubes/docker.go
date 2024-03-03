package kubes

import (
	docker "github.com/fsouza/go-dockerclient"
	"github.com/pkg/errors"
	"os"
	"os/exec"
)

func pullDockerImageAndGetSHA(imageName string) (string, error) {
	client, err := docker.NewClientFromEnv()
	if err != nil {
		return "", err
	}
	err = client.PullImage(docker.PullImageOptions{
		Repository: imageName,
		Tag:        "latest",
	}, docker.AuthConfiguration{})
	if err != nil {
		return "", err
	}

	img, err := client.InspectImage(imageName)
	if err != nil {
		return "", err
	}
	return img.ID, nil
}

func addHashToImage(imageName string) (string, error) {
	client, err := docker.NewClientFromEnv()
	if err != nil {
		return "", err
	}
	img, err := client.InspectImage(imageName)
	if err != nil {
		return "", err
	}
	if len(img.RepoDigests) == 0 {
		return "", errors.New("no repo digests found")
	}
	return img.RepoDigests[0], nil
}

func BuildAndTagImage(ctxDir, dockerfilePath, imageName string) (string, error) {

	// TODO breadchris this is better, but docker cli is OK for now

	//client, err := docker.NewClientFromEnv()
	//if err != nil {
	//	return "", errors.Wrapf(err, "failed to create Docker client")
	//}
	//buildOptions := docker.BuildImageOptions{
	//	Context:        context.Background(),
	//	ContextDir:     ctxDir,         // Path to the build context
	//	Dockerfile:     dockerfilePath, // Path to the Dockerfile
	//	Name:           imageName,      // Temporary name for the built image
	//	OutputStream:   os.Stdout,      // Forward build output to stdout
	//	RmTmpContainer: true,           // Remove intermediate containers after a successful build
	//	//ForceRmTmpContainer: true,           // Always remove intermediate containers
	//	BuildArgs: []docker.BuildArg{
	//		{
	//			Name:  "platform",
	//			Value: "linux/amd64",
	//		},
	//	},
	//}
	//
	//// Build the image
	//if err := client.BuildImage(buildOptions); err != nil {
	//	return "", errors.Wrapf(err, "failed to build the image")
	//}
	//err = client.PushImage(docker.PushImageOptions{
	//	Name: imageName,
	//	Tag:  "latest",
	//}, docker.AuthConfiguration{})
	//if err != nil {
	//	return "", errors.Wrapf(err, "failed to push the image")
	//}

	cmd := exec.Command("docker", "build", "-t", imageName, "-f", dockerfilePath, "--platform", "linux/amd64", ctxDir)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return "", errors.Wrapf(err, "failed to build the image")
	}

	newCmd := exec.Command("docker", "push", imageName)
	newCmd.Stdout = os.Stdout
	newCmd.Stderr = os.Stderr
	if err := newCmd.Run(); err != nil {
		return "", errors.Wrapf(err, "failed to push the image")
	}
	return addHashToImage(imageName)
}
