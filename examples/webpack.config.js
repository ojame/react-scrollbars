var webpack = require('webpack');

module.exports = {
  entry: './',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin( // allow examples to include react-scrollbar
      /^react-scrollbar$/,
      __dirname + '/../src'
    )
  ],
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: [
          'react-hot',
          'jsx',
        ]
      },
      { test: /\.css$/, loaders: [
          'style',
          'css',
          'autoprefixer',
        ]
      },
      { test: /\.(png|woff)$/, loader: 'url?limit=100000' },
      { test: /\.md$/, loader: "html!markdown" }
    ]
  }
};
