import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import preprocess from 'svelte-preprocess';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const isDev = Boolean(process.env.ROLLUP_WATCH);
const isProd = !isDev;

export default {
    input: "src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/build/bundle.js",
    },
    plugins: [
        svelte({
            preprocess: preprocess({
                typescript: {

                }
            }),
            compilerOptions: { dev: isDev },
        }),
        css({ output: "bundle.css", sourceMap: true }),
        resolve({
            browser: true,
            preferBuiltins: false,
            dedupe: ["svelte"],
        }),
        commonjs(),
        nodePolyfills(),
        typescript({
            sourceMap: true,
            inlineSources: isDev,
            cacheDir: "node_modules/.tmp/.rollup.tscache",
        }),
        isProd && terser(),
    ],
    watch: {
        clearScreen: true,
        buildDelay: 1500,
        exclude: ["node_modules/**", "*.go"],
    },
};
