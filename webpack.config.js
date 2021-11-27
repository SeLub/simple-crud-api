
export default {
  entry: './server.js',
  output: {
    filename: "bundle.js",
    module: true,
    clean: true,
  },
  target: 'node16.13',
  mode: 'none',
  experiments: {
    outputModule: true,
  },
};