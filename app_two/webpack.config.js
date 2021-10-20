const path = require('path')

const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: { app_two: './src/index' },
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
        name: 'app_two',
        filename: 'remote-entry.js',
        exposes: {
          './remote-export': './src/remote-export'
        },
        // shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
      }
    ),
    new HtmlWebpackPlugin(
      {
        template: './src/app_two.html',
        filename: '[name].html'
      }
    ),
  ],
  devServer: {
    compress: true,
    allowedHosts: 'auto',
    host: '0.0.0.0',
    port: 3035,
    https: false,
    hot: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    client: {
      progress: true,
      logging: 'none',
      overlay: { warnings: false }
    },
    static: {
      watch: {
        ignored: '**/node_modules/**'
      }
    }
  }
}
