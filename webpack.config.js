var path = require('path');

module.exports = {
  context: path.resolve(__dirname + "/app"),

  entry: {
    javascript: "./js/app.js",
    html: "./index.html",
  },

  output: {
    filename: "app.js",
    path: path.resolve(__dirname + "/dist"),
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }
};
