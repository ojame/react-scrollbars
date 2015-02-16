/** @jsx React.DOM */

var React = require('react');
var VerticalScrollbar = require('./components/example-vertical-scrollbar.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <div>
        <h1>Vertical Scrollbars</h1>
        <VerticalScrollbar />
      </div>
    );
  }
});