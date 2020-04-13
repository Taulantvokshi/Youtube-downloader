const path = require('path');
module.exports = {
  entry: './src/index.js', // assumes your entry point is the index.js in the root of your project folder
  mode: 'development',
  output: {
    path: path.join(__dirname, '/public'), // assumes your bundle.js will also be in the root of your project folder
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
};
