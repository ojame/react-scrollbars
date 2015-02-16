/** @jsx React.DOM */

var React = require('react');
var VerticalScrollbar = require('./examples/vertical-scrollbar.jsx');
var NoVerticalOverflow = require('./examples/no-vertical-scrollbar.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <div>
        <h1>Vertical Scrollbars</h1>

        <h3>Standard</h3>
        <VerticalScrollbar />

        <h3>No scrollbar</h3>
        <NoVerticalOverflow />
      </div>
    );
  }
});