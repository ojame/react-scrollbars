import React from 'react';
import Home from './views/home/index.js';

require('normalize.css/normalize.css');
require('./app.css');

var App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <div className="App-content">
          <Home />
        </div>
      </div>
    );
  }
});

React.render(<App />, document.body);
