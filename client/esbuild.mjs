import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

const prodBuild = false

const watch = !prodBuild ? {
  onRebuild: () => {
    console.log("rebuilt!");
  },
} : undefined;

const minify = prodBuild;

const nodeEnv = prodBuild ? "'production'" : "'development'";

const context = await esbuild
  .context(
    {
      entryPoints: ["./src/main.ts"],
      //mainFields: ["svelte", "browser", "module", "main"],
      outfile: "public/build/bundle.js",
      bundle: true,
      loader: {
        ".ts": "tsx",
        ".tsx": "tsx",
        ".woff2": "file",
        ".woff": "file",
      },
      plugins: [
        nodeModulesPolyfillPlugin(),
        sveltePlugin({
          preprocess: sveltePreprocess(),
        }),
      ],
      minify,
      sourcemap: "linked",
      define: {
        "global": "window",
        "process": "{}",
        "process.env": "{}",
        "process.env.NODE_ENV": nodeEnv,
      },
      logLevel: 'info'
    },
  );

const result = await context.rebuild()

await context.watch()
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