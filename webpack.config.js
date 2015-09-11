var webpack = require('webpack');

module.exports = {
  entry: './src',
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /__examples__/,
        loader: 'babel'
      }
    ]
  },
  output: {
    filename: 'build/react.scrollbar.min.js',
    libraryTarget: 'umd',
    library: 'ReactScrollbar'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
