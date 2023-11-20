import esbuild from "esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

const devBuild = process.env.DEV === "true";

const watch = devBuild
	? {
			onRebuild: () => {
				console.log("rebuilt!");
			},
	  }
	: undefined;

const minify = devBuild ? false : true;

const nodeEnv = devBuild ? '"development"' : '"production"';

const options = {
	entryPoints: ["./src/index.tsx"],
	outdir: "public/build/",
	format: "esm",
	bundle: true,
	loader: {
		".ts": "tsx",
		".tsx": "tsx",
		".woff2": "file",
		".woff": "file",
	},
	plugins: [nodeModulesPolyfillPlugin()],
	minify: minify,
	sourcemap: "linked",
	define: {
		global: "window",
		process: "{}",
		"process.env": "{}",
		"process.env.NODE_ENV": nodeEnv,
	},
	logLevel: "info",
};

// await esbuild.build(options);
if (!devBuild) {
	await esbuild.build(options);
} else {
	const context = await esbuild.context(options);

	const result = await context.rebuild();
	console.log('serving', `public`)
	context.serve({
		servedir: `public`,
		fallback: `public/index.html`,
		onRequest: args => {
			console.log(args.method, args.path)
		}
	})
	await context.watch();
}
