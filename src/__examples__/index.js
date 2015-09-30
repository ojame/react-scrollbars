import React from 'react';
import Home from './views/home/index';

require('normalize.css/normalize.css');
require('./app.css');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />

        <div className="App-content">
          <Home />
        </div>
      </div>
    );
  }
};

React.render(<App />, document.body);
