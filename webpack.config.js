const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  devServer: {
    static: './public',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};