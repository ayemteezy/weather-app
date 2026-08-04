import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import sharpAdapter from "responsive-loader/sharp.js";
import Dotenv from "dotenv-webpack";

export default {
  entry: path.resolve(import.meta.dirname, "../src/index.js"),
  output: {
    path: path.resolve(import.meta.dirname, "../dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Teezy | Weather App",
      template: path.resolve(import.meta.dirname, "../public/index.html"),
    }),
    new ESLintPlugin({
      extensions: ["js"],
      context: path.resolve(import.meta.dirname, "../src"),
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx", ".wasm"],
    byDependency: {
      esm: {
        fullySpecified: false,
      },
    },
    alias: {
      "@": path.resolve(import.meta.dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                namedExport: false,
              },
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: { filename: "assets/icons/[name].[hash][ext]" },
      },
      {
        test: /\.gif$/i,
        type: "asset/resource",
        generator: { filename: "assets/images/[name].[hash][ext]" },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name].[hash][ext]" },
      },
      {
        test: /\.(png|jpe?g)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: "responsive-loader",
            options: {
              adapter: sharpAdapter,
              format: "webp",
              name: "assets/images/[name].[hash].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
