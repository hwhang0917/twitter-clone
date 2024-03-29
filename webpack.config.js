const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

const appIndex = path.resolve(__dirname, "src", "index.tsx");
const appBuild = path.resolve(__dirname, "build");
const appHtml = path.resolve(__dirname, "public", "index.html");
const appPublic = path.resolve(__dirname, "public");

module.exports = (webpackEnv) => {
  return {
    mode: webpackEnv,
    entry: appIndex,
    output: {
      path: appBuild,
      filename: webpackEnv.production
        ? "static/js/[name].[contenthash:8].js"
        : webpackEnv.development && "static/js/bundle.js",
    },
    optimization: {
      minimize: webpackEnv.production,
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            "cache-loader",
            {
              loader: "ts-loader",
              options: {
                transpileOnly: webpackEnv.development ? true : false,
              },
            },
          ],
        },
        {
          loader: "file-loader",
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            outputPath: "static/media",
            name: "[name].[hash:8].[ext]",
            esModule: false,
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: appHtml }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(
          Object.assign({}, dotenv.config().parsed, { NODE_ENV: webpackEnv })
        ),
      }),
      new ManifestPlugin(),
    ],
    cache: {
      type: webpackEnv.development
        ? "memory"
        : webpackEnv.production && "filesystem",
    },
    devServer: {
      port: 3000,
      contentBase: appPublic,
      open: true,
      historyApiFallback: true,
      overlay: true,
      stats: "errors-warnings",
    },
    devtool: webpackEnv.production ? "source-map" : "cheap-module-source-map",
  };
};
