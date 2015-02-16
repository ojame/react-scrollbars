/** @jsx React.DOM */
React = require('react');

var Scrollbar = React.createClass({
  getDefaultProps: function() {
    return {
      offset: 2,
      stickHeight: 100,
      stickPosition: 0,
      showScrollbar: true
    };
  },

  render: function() {
    var bottom = this.props.offset;
    var height;

    if (this.props.contentHeight) {
      height = this.props.contentHeight - (this.props.offset * 2);
    }

    var scrollbarStyle = {
      width: 10,
      borderRadius: 4,
      background: 'RGB(220, 220, 220)',
      position: 'absolute',
      top: this.props.offset,
      height: height || 'auto',
      bottom: height ? 'auto' : this.props.offset,
      right: this.props.offset,
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

    if (this.props.showScrollbar) {
      return (
        <div style={scrollbarStyle}>
          <div style={scrollbarStickStyle} onMouseDown={this.props.onMouseDown}></div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
});

module.exports = Scrollbar;
