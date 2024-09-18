const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Change to 'production' for production build
    entry: {
      main: path.resolve(__dirname, 'client/src/js/index.js'),  // Absolute path to main JS file
      install: path.resolve(__dirname, 'client/src/js/install.js')  // Absolute path to install.js
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Output path
      publicPath: './', // Public path to serve the assets
    },
    resolve: {
      extensions: ['.js', '.json'], // Auto-resolve these extensions
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client/src/index.html'), // Absolute path to HTML file
        title: 'JATE',
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'serviceworker.js'), // Correct service worker file path
        swDest: 'serviceworker.js', // Destination for service worker
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor that works offline!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve(__dirname, 'logo.png'), // Moved logo.png to root
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // CSS loader
        },
        {
          test: /\.js$/,
          exclude: /node_modules/, // Exclude node_modules
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Use Babel preset for modern JS
            },
          },
        },
      ],
    },
  };
};
