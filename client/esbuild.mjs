import esbuild from "esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import { spawn, spawnSync } from "child_process";

const runTailwindBuild = (watch) => {
	console.log("Building Tailwind CSS...");
	try {
		const command = 'npx';
		const args = ['tailwindcss', 'build', '-o', 'public/build/tailwind.css'];

		if (watch) {
			args.push('--watch')
			spawn(command, args, {
				stdio: 'inherit'
			})
		} else {
			spawnSync(command, args, {
				stdio: 'inherit'
			});
		}
		console.log("Tailwind CSS build successful!");
	} catch (error) {
		console.error("Error building Tailwind CSS:", error.message);
	}
  };

const devBuild = process.env.DEV === "true";

const minify = !devBuild;

const nodeEnv = devBuild ? '"development"' : '"production"';

const options = {
	entryPoints: [
		"./src/index.tsx",
	],
	outdir: "public/build/",
	format: "esm",
	bundle: true,
	loader: {
		".ts": "tsx",
		".tsx": "tsx",
		".woff2": "file",
		".woff": "file"
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
	logLevel: "info"
};


if (!devBuild) {
	runTailwindBuild(false);
	await esbuild.build(options);
} else {
	runTailwindBuild(true);

	const context = await esbuild.context(options);

	const result = await context.rebuild();
	console.log('serving', `public`)
	context.serve({
		port: 8001,
		servedir: `public`,
		fallback: `public/index.html`,
		onRequest: args => {
			console.log(args.method, args.path)
		},
	})
	await context.watch();
}
