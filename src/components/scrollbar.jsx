var React = require('react');

var Scrollbar = React.createClass({
  getDefaultProps: function() {
    return {
      offset: 0,
      stickLength: {
        horizontal: 100,
        vertical: 100
      },
      stickPosition: {
        horizontal: 0,
        vertical: 0
      },
      scrollbarLength: {
        horizontal: 100,
        vertical: 100
      },
      showScrollbar: true,
      vertical: true, // TODO: warn if both vert and hor are set to true, can only have one
      horizontal: false
    };
  },

  render: function() {
    var bottom = this.props.offset;
    var height;

    if (this.props.scrollbarLength.vertical) {
      height = this.props.scrollbarLength.vertical;
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
      height: this.props.stickLength.vertical,
      top: this.props.stickPosition.vertical,
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
