/** @jsx React.DOM */
'use strict'
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Firebase = require('firebase');


var Home = require('./views/home/index.jsx');
var Login = require('./views/login/index.jsx');
var Create = require('./views/create/index.jsx');

require('normalize.css/normalize.css');
require('./app.scss');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var accountStore = require('./stores/account.js');

var stores = {
  AccountStore: new accountStore()
};

var actions = require('./actions.js');
var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;

flux.on('dispatch', function(type, payload) {
  if (console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});

var App = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('AccountStore')],

  getStateFromFlux: function() {
    return {};
  },

  render: function () {
    var Footer = this.props.footer;
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <div className="App-content">
          <RouteHandler flux={flux}/>
        </div>

        <footer className="App-footer">
          { Footer &&
              <Footer/>
          }
        </footer>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="login" handler={Login}/>
    <Route name="create" handler={Create}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  var footer = state.routes[1].handler.Footer;
  React.render(<Handler flux={flux} footer={footer}/>, document.body);
});
