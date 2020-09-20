const { resolve } = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    include: resolve(__dirname, "../src"),
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        },
      }
    ]
  })
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
}