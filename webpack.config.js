module.exports = {
  entry: './src/YaDanmaku.js',
  output: {
    path: __dirname,
    filename: './output/YaDanmaku.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}