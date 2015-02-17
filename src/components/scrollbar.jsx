var React = require('react');
var _ = require('lodash-node');

var Scrollbar = React.createClass({
  getDefaultProps: function() {
    return {
      offset: 0,
      scrollbarThickness: 10,
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
      borderRadius: 4,
      background: 'red',
      position: 'absolute',
      opacity: 1
    };

    var stickStyle = {
      background: 'black',
      position: 'absolute',
      borderRadius: 4
    };

    // TODO: clean this junk UP

    var scrollbarStyleVertical = _.extend({
      width: this.props.scrollbarThickness,
      top: this.props.offset,
      height: height || 'auto',
      bottom: height ? 'auto' : this.props.offset,
      right: this.props.offset,
    }, scrollbarStyle);

    var scrollbarStyleHorizontal = _.extend({
      left: this.props.offset,
      bottom: this.props.offset,
      right: this.props.offset,
      height: this.props.scrollbarThickness
    }, scrollbarStyle);

    var scrollbarStickStyleVertical = _.extend({
      width: this.props.scrollbarThickness,
      height: this.props.stickLength.vertical,
      top: this.props.stickPosition.vertical,
      right: 0
    }, stickStyle);

    var scrollbarStickStyleHorizontal = _.extend({
      height: this.props.scrollbarThickness,
      width: this.props.stickLength.horizontal,
      left: this.props.stickPosition.horizontal
    }, stickStyle);

    if (this.props.showScrollbar) {
      return (
        <div>
          <div style={scrollbarStyleVertical}>
            <div style={scrollbarStickStyleVertical} onMouseDown={this.props.onMouseDown.bind(null, 'y')}></div>
          </div>

          <div style={scrollbarStyleHorizontal}>
            <div style={scrollbarStickStyleHorizontal} onMouseDown={this.props.onMouseDown.bind(null, 'x')}></div>
          </div>
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
