const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src") + "/scripts/pages/index.js",
    photographer:
      path.resolve(__dirname, "src") + "/scripts/pages/photographer.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: { extensions: [".js"] },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, "src") + "/index.html",
      filename: path.resolve(__dirname, "dist") + "/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, "src") + "/photographer.html",
      filename: path.resolve(__dirname, "dist") + "/photographer.html",
      chunks: ["photographer"],
    }),
    new ESLintPlugin(),
  ],
};
