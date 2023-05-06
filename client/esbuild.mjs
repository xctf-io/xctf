import esbuild from "esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

const prodBuild = process.env.BUILD === "true";

const watch = !prodBuild
	? {
			onRebuild: () => {
				console.log("rebuilt!");
			},
	  }
	: undefined;

const minify = prodBuild;

const nodeEnv = prodBuild ? "'production'" : "'development'";

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
	plugins: [nodeModulesPolyfillPlugin()],
	minify: false,
	sourcemap: "linked",
	define: {
		global: "window",
		process: "{}",
		"process.env": "{}",
		"process.env.NODE_ENV": nodeEnv,
	},
	logLevel: "info"
};

if (prodBuild) {
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
