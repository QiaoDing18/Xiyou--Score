var path = require("path");

module.exports = {
  entry: {
    index: "./src/jsx/index.js",
    scroe: "./src/jsx/score.js",
  },
  output: {
    path: path.join(__dirname, "build/jsx_build/"),
    filename: "[name].jsx.js"
  },
  resolve: {
    extensions: ['','.js','.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "jsx-loader" }
    ]
  }
};