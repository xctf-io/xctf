# xCTF
A simple CTF platform written in go. An ode to the illustrious [CTFd](https://github.com/CTFd/CTFd).

We just [ran a competition](https://www.youtube.com/watch?v=2AOxuHuHS1U) for 200 high schoolers in person using this framework.

Have ideas about what should go in here? Come talk to us on ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white&link=https://discord.gg/J6VJQhhQ)!

Currently in alpha. 

## Goals
- Simple: Capture only the basics of what a CTF competition needs in a single binary.
- Extendable: A well documented API to allow for creativity and variety of competitions.

## Development

### Tech Stack
CTFg is developed with:
- [Go](https://go.dev/): This is used for the server.
	- Reasoning: This was chosen to make development and deployment easy and consistent. While Python or Javascript would be more approachable languages to more people, Go's types and tools are more conducive for CTFg being extendable. Additionally, plugins for CTFg, written in any language, are made possible through projects such as [this](https://github.com/hashicorp/go-plugin).
- [React](https://react.dev/): This is used for client.
	- Reasoning: This was chosen because using React has the best libraries and support by the community. While we prefer other frameworks, React's ecosystem is simply unmatched. If you are not familiar with React, the [tutorial](https://react.dev/learn) should teach you all you need to know.

### Running Locally
#### Docker
Run this command to start xCTF in a docker container with postgres:
```
docker-compose up
```

#### Server
Run this command to start the backend:
```
go run main.go --dev
```

#### Backups
To have automatic backups with sqlite, run minio:
```shell
docker run -t -p 9000:9000 -p 9090:9090 -v PATH:/mnt/data -v "$(pwd)/minio/config:/etc/config.env" -e "MINIO_CONFIG_ENV_FILE=/etc/config.env" --rm quay.io/minio/minio server --console-address ":9090"
```

Open up `http://localhost:9090`, login with `minio:minio123`, and create the bucket `xctf`.

#### Web site
Run this command to start the frontend:
```
npm run dev
```
Build the client for production:
```
npm run build
```

### Protoc Generation
```
go generate ./...
```

### Flag Synchronization
```
go run main.go manage --url {xctf_url}/api --email {admin email} --password {admin password} flags sync {path to challenges}
```

Example:
```
go run main.go manage --url http://localhost:8000/api --email admin@admin.com --password password flags sync ../chalgen/competitions/mcpshsf-2023/chals
```