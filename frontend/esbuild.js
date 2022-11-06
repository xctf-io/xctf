const esbuild = require('esbuild');
const inlineImage = require('esbuild-plugin-inline-image');
const { start } = require('live-server');

const port = 3000;

const init = () => {
  esbuild
    .build(
      {
        entryPoints: ['./src/index.tsx'],
        outfile: './public/assets/app.js',
        bundle: true,
        watch: {
          onRebuild: () => {
            console.log('rebuilt!');
          },
        },
        loader: {
          '.ts': 'tsx',
          '.tsx': 'tsx',
          '.woff2': 'file',
          '.woff': 'file',
        },
        plugins: [inlineImage()],
        minify: false,
        sourcemap: 'inline',
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      },
    )
    .catch((e) => console.error(e))
    .then(() => console.log(`Listening on port: ${port}`));

  if (process.argv.includes('--serve')) {
    start(
      {
        root: 'public',
        port,
        file: 'index.html',
        noBrowser: true,
        minify: false,
        sourcemap: 'inline',
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      });
  }
};
init();