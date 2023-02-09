# svelte-go-template

A simple Svelte based SPA app with a Go API server that can also embed and serve the HTML, JS, and CSS files. Handy for
quick and dirty MVPs, prototypes and spikes.

The Client includes:
- [Svelte](https://svelte.dev/)
- [Typescript]()
- [Svelte Routing](https://www.npmjs.com/package/svelte-routing)
- [Sveltestrap](https://www.npmjs.com/package/sveltestrap), a [Bootstrap]() wrapper for Svelte
- [Tailwind CSS](https://tailwindcss.com/) and [Postcss]()
- [Svelte awesome](https://www.npmjs.com/package/svelte-awesome) for fontawesome
- [Rollup]() for the bundler

The Backend includes:
- [Chi router](https://github.com/go-chi/chi) set up with some nice and easy defaults
- [Go:embed](https://golang.org/pkg/embed/) to embed the built SPA app into the binary for painless hosting
- Set up to work with svelte-router, will serve the `index.html` at all unused paths instead of 404
- Gracefull http server shutdown


## Start a new project

Use `degit`:

```
npx degit adamveld12/svelte-go-template <my project folder>
```

Then run with `make`:

```
make dev-client # starts the client
make dev-server # starts the server
```

When you're ready to go to production:

```
make build # output in .bin folder
```


## LICENSE

MIT
