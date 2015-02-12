/** @jsx React.DOM */
'use strict'
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Vertical = require('./views/vertical/index.jsx');

require('normalize.css/normalize.css');
require('./app.scss');

var App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <div className="App-content">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="vertical" handler={Vertical}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.body);
});
