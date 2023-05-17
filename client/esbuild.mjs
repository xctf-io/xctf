import esbuild from "esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import mdx from "@mdx-js/esbuild";

const devBuild = process.env.DEV === "true";
const watchToggle = false;

const watch = watchToggle
	? {
			onRebuild: () => {
				console.log("rebuilt!");
			},
	  }
	: undefined;

const minify = devBuild ? false : true;

const nodeEnv = devBuild ? '"development"' : '"production"';

const options = {
	entryPoints: ["./src/main.tsx"],
	outfile: "public/build/bundle.js",
	bundle: true,
	loader: {
		".ts": "tsx",
		".tsx": "tsx",
		".woff2": "file",
		".woff": "file",
	},
	plugins: [nodeModulesPolyfillPlugin(), mdx()],
	minify: minify,
	sourcemap: "linked",
	define: {
		global: "window",
		process: "{}",
		"process.env": "{}",
		"process.env.NODE_ENV": nodeEnv,
	},
	logLevel: "info"
};

if (!watchToggle) {
	await esbuild.build(options);
} else {
	const context = await esbuild.context(options);

	const result = await context.rebuild();
	await context.watch();
	// maybe think of live reload? https://esbuild.github.io/api/#live-reload
	// process.stdin.on('data', async () => {
	//   try {
	//     // Cancel the already-running build
	//     await context.cancel()

	//     // Then start a new build
	//     console.log('build:', await context.rebuild())
	//   } catch (err) {
	//     console.error(err)
	//   }
	// })
}
