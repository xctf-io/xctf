import esbuild from "esbuild";
import { spawn, spawnSync } from "child_process";

const devBuild = process.env.DEV === "true";
const minify = !devBuild;
const nodeEnv = devBuild ? '"development"' : '"production"';

const runTailwindBuild = (watch) => {
	console.log("Building Tailwind CSS...");
	try {
		const command = 'npx';
		const args = [
			'tailwindcss',
			'build',
			'-i', 'src/styles/tailwind.css',
			'-o', 'public/build/tailwind.css'
		];

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
	plugins: [],
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


if (!devBuild) {
	runTailwindBuild(false);
	await esbuild.build(options);
} else {
	runTailwindBuild(true);

	const context = await esbuild.context(options);

	const result = await context.rebuild();
	console.log('serving', `public`)
	context.serve({
		// TODO breadchris make configurable
		port: 8421,
		servedir: `public`,
		fallback: `public/index.html`,
		onRequest: args => {
			console.log(args.method, args.path)
		},
	})
	await context.watch();
}
