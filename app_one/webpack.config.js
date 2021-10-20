const path = require('path')

const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: { app_one: './src/index' },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['@babel/preset-react', { runtime: 'automatic' }]],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'app_one',
        remotes: {
          app_two: `app_two@/remote-entry.js`,
        },
        // shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
      }
    ),
    new HtmlWebpackPlugin(
      {
        template: './src/app_one.html',
        filename: '[name].html'
      }
    ),
  ],
}
