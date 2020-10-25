const { srcRoot } = require('./../config/paths');
module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      include: srcRoot,
      loader: 'babel-loader',
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1
          }
        },
        "postcss-loader",
        "sass-loader",
      ]
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 5000,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
      loader: require.resolve('url-loader'),
      options: {
        limit: 5000,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    } // 限制大小小于5k   
  );
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
}