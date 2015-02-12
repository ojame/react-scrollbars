var webpack = require('webpack');

var plugins = [
  new webpack.IgnorePlugin(/vertx/),
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
  new webpack.optimize.CommonsChunkPlugin('app', 'build.js', false)
];

module.exports = {
  devtool: 'source-map',
  entry: ['./app/app.jsx'],
  ouput: {
    path: './build',
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot-loader', 'jsx-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader?includePaths[]=./app/style-guide,includePaths[]=./node_modules,includePaths[]=./style'
        ],
      },
      { test: /\.(png|woff)$/, loader: 'url-loader?limit=100000' }
    ]
  }
};