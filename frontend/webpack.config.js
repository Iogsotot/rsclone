const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';

function setDevTool() {
  if (isDev) {
    return 'source-map';
  }
  return 'none';
}

function setDMode() {
  if (isProd) {
    return 'production';
  }
  return 'development';
}

const config = {
  target: 'web',
  entry: { index: './src/scripts/App.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: setDMode(),
  devtool: setDevTool(),
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      }],
    },
    // {
    //   test: /\.js$/,
    //   use: ['babel-loader'/* , 'eslint-loader' */],
    //   exclude: [
    //     /node_modules/,
    //   ],
    // },
    {
      test: /\.ts$|\.js$/,
      loader: 'ts-loader',
      include: path.join(__dirname, './src'),
      exclude: [
        /node_modules/,
      ],
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/imgs',
            name: '[name].[ext]',
            esModule: false,
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            mozjpeg: {
              progressive: true,
              quality: 75,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
              optimizationLevel: 1,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|ttf|otf|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      }],
    },
    {
      test: /\.(mp3)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      }],
    },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/', to: './assets/' },
      { from: './src/favicon.png' },
      {
        from: path.resolve(__dirname, 'src/favicon.png'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    overlay: true,
    stats: 'errors-only',
    clientLogLevel: 'none',
  },
};

if (isProd) {
  config.plugins.push(
    new UglifyJSPlugin(),
  );
}

module.exports = config;
