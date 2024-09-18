const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Development mode
    entry: {
      main: './src/js/index.js',    // Main entry point
      install: './src/js/install.js' // For handling PWA install logic
    },
    output: {
      filename: '[name].bundle.js', // Dynamically name bundles
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    plugins: [
      // Generates the main HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE', // Customize the title
      }),
      // Injects the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to service worker source file
        swDest: 'src-sw.js',  // Destination in the dist folder
      }),
      // PWA Manifest
      new WebpackPwaManifest({
        fingerprints: false, // Avoids hashing the file names
        inject: true, // Injects the manifest link into the HTML
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor that works offline!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Multiple icon sizes
            destination: path.join('assets', 'icons'), // Where icons will be stored
          },
        ],
      }),
    ],

    // Define module rules
    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader for transpiling JavaScript
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Use Babel preset-env
            },
          },
        },
      ],
    },
  };
};
