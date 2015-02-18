/** @jsx React.DOM */

var React = require('react');
var BothScrollbar = require('./examples/both-scrollbar.jsx');
var HorizontalScrollbar = require('./examples/horizontal-scrollbar.jsx');
var VerticalScrollbar = require('./examples/vertical-scrollbar.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <div>
        <h1>Scrollbars</h1>

        <h3>Vertical Scrollbars</h3>
        <VerticalScrollbar />

        <h3>Horizontal Scrollbars</h3>
        <HorizontalScrollbar />

        <h3>Horizontal and Vertical Scrollbars</h3>
        <BothScrollbar />

      </div>
    );
  }
});