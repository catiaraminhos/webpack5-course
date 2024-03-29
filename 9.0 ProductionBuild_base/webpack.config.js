const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    courses: './src/pages/courses.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/courses.html',
      chunks: ['courses'],
      filename: 'courses.html',
      base: 'pages'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path
            .resolve(__dirname, 'src/assets/images/*')
            .replace(/\\/g, '/'),
          to: path.resolve(__dirname, 'dist').replace(/\\/g, '/'),
          context: 'src'
        }
      ]
    }),
    // new BundleAnalyzerPlugin({}),
    new MiniCSSExtractPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
