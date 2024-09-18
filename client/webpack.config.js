const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',    // Updated to point to client/src/js/index.js
      install: './client/src/js/install.js' // Updated to point to client/src/js/install.js
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Outputs into /dist
    },
    plugins: [
      // Generate the HTML file
      new HtmlWebpackPlugin({
        template: './client/src/index.html',  // Updated to point to client/src/index.html
        title: 'JATE',
      }),
      // Inject the custom service worker
      new InjectManifest({
        swSrc: './client/src-sw.js',  // Service worker location
        swDest: 'src-sw.js',  // Output the service worker in the dist folder
      }),
      // Webpack PWA manifest configuration
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor that works offline!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './client',
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        // CSS loader for styles
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader for JavaScript files
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
