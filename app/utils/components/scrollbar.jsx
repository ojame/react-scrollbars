/** @jsx React.DOM */
React = require('react');

var Scrollbar = React.createClass({
  getDefaultProps: function() {
    return {
      stickHeight: 100,
      stickPosition: 0
    };
  },

  render: function() {
    var scrollbarStyle = {
      width: 10,
      borderRadius: 4,
      background: 'RGB(220, 220, 220)',
      position: 'absolute',
      top: 2,
      right: 2,
      bottom: 2,
      opacity: 1
    };

    var scrollbarStickStyle = {
      width: 10,
      height: this.props.stickHeight,
      top: this.props.stickPosition,
      right: 0,
      background: 'RGB(130, 130, 130)',
      position: 'absolute',
      borderRadius: 4
    };

    return (
      <div style={scrollbarStyle}>
        <div style={scrollbarStickStyle} onMouseDown={this.props.onMouseDown}></div>
      </div>
    );
  }
});

module.exports = Scrollbar;
