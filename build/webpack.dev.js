import path from "node:path";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: [path.resolve(import.meta.dirname, "../public/index.html")],
    static: {
      directory: path.resolve(import.meta.dirname, "../dist"),
    },
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,
  },
});
