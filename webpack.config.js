// Chargement des plugins
const TerserPlugin = require('terser-webpack-plugin'); // Minify JS
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Minify Css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Clean derectories before generate files
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Inject les liens dynamique des fichier hashé
const ESLintPlugin = require('eslint-webpack-plugin'); // ESlint
const Dotenv = require('dotenv-webpack'); // ENV
require('dotenv').config();

const path = require('path');
const publicPath = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/` : './';

// Verification de l'environnement de developpement
const dev = process.env.NODE_ENV === 'development';

const config = {
  mode: process.env.NODE_ENV,
  watch: dev,
  devtool: dev ? 'eval-cheap-module-source-map' : 'source-map',
  entry: ['./src/app.js', './src/scss/app.scss'],

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: publicPath,
    filename: dev ? 'js/app.js' : 'js/app_[chunkhash:8].js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        type: 'asset/resource',
        test: /\.json$/,
        generator: {
          filename: 'assets/lottie/[name][ext]',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv({ systemvars: true }),
    new CleanWebpackPlugin({
      dry: false, // tester la configuration "true" avant de clean
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['js/*', 'css/*'],
    }),
    new MiniCssExtractPlugin({
      // cache managment avec hash en prod
      filename: dev ? 'css/app.css' : 'css/app_[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.ejs',
      publicPath: publicPath,
      favicons: {
        android512: 'assets/android-chrome-512x512.png',
        android192: 'assets/android-chrome-192x192.png',
        appleTouch: 'assets/apple-touch-icon.png',
        favicon16: 'assets/favicon-16x16.png',
        favicon32: 'assets/favicon-32x32.png',
      },
    }),
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    }),
  ],
};

// Ajout de plugins seulement si mode production
if (!dev) {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

module.exports = config;
