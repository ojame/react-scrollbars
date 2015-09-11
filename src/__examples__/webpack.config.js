var webpack = require('webpack');

module.exports = {
  entry: './',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
        ]
      },
      { test: /\.(png|woff)$/, loader: 'url?limit=100000' },
      { test: /\.md$/, loader: "html!markdown" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ]
};
