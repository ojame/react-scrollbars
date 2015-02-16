/** @jsx React.DOM */

var React = require('react');
var HorizontalScrollbar = require('./examples/horizontal-scrollbar.jsx');
var VerticalScrollbar = require('./examples/vertical-scrollbar.jsx');
var NoVerticalOverflow = require('./examples/no-vertical-scrollbar.jsx');
var VerticalScrollbarPadding = require('./examples/vertical-scrollbar-padding.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <div>
        <h1>Scrollbars</h1>

        <h2>Horizontal Scrollbars</h2>
        <HorizontalScrollbar />
{/*
        <h2>Vertical Scrollbars</h2>

        <h3>Standard</h3>
        <VerticalScrollbar />

        <hr />

        <h3>Content with padding</h3>
        <VerticalScrollbarPadding />

        <hr />

        <h3>No scrollbar</h3>
        <NoVerticalOverflow />*/}
      </div>
    );
  }
});