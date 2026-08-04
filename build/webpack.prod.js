import { mergeWithRules } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"; // Adds the CSS minifier
import common from "./webpack.common.js";

const merge = mergeWithRules({
  module: {
    rules: {
      test: "match", // Looks for exact test matches (like /\.css$/i)
      use: "replace", // Replaces the development 'use' loaders entirely
    },
  },
});

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    runtimeChunk: "single",
    minimize: true, // Forces Webpack to execute minification steps
    minimizer: [
      "...", // Keeps the default JS minification engine running flawlessly
      new CssMinimizerPlugin(), // Compresses the extracted CSS files into one line
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // Spits CSS files out inside a dedicated folder
    }),
  ],
  module: {
    rules: [
      // 1. Matches and completely replaces your CSS Modules configuration for production
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64:8]",
                namedExport: false,
              }, // Highly secure, tiny class names for production
            },
          },
        ],
      },
      // 2. Matches and replaces your standard global CSS configuration for production
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
});
