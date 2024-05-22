const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const configs = require('./configs');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;
// Load environment variables from .env file
require('dotenv').config();
module.exports = (_, argv) => {
  return {
    entry: './src/index.ts',
    mode: process.env.WEBPACK_MODE || 'production',
    target: 'web',
    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: {
        index: '/index.html',
      },
      port: configs.PORT,
      liveReload: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: false,
        },
      },
    },
    output: {
      publicPath: '/',
    },
    resolve: {
      modules: [__dirname, 'node_modules'],
      extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        src: path.resolve(__dirname, './src'),
      },
      symlinks: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpg|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ['raw-loader'],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto', // This line might be necessary for newer versions of webpack
        },
      ],
    },

    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        exposes: configs.exposes,
        shared: {
          ...deps,
          react: {
            import: 'react',
            shareKey: 'react',
            shareScope: 'default',
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
          },
          'react-router-dom': {
            singleton: true,
          },
          'react-hook-form': {
            singleton: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};
