# CTFg
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
	- Reasoning: This was chosen to make development and deployment easy and consistent. While python or javascript would be more approachable languages to more people, Go's types and tools are more conducive for CTFg being extendable. Additionally, plugins for CTFg, written in any language, are made possible through projects such as [this](https://github.com/hashicorp/go-plugin).
- [React](https://react.dev/): This is used for client.
	- Reasoning: This was chosen because using react has the best libraries and support by the community. While we prefer other frameworks, React's ecosystem is simply unmatched. If you are not familiar with React, the [tutorial](https://react.dev/learn) should teach you all you need to know.

### Running Locally
#### Live reloads
TODO

#### Web site
Build the client for development:
```
npm run dev
```
Build the client for production:
```
npm run build
```

#### Server
```
go run cmd/main.go
```

### Protoc Generation