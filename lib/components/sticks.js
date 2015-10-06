'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Sticks = _react2['default'].createClass({
  displayName: 'Sticks',

  getDefaultProps: function getDefaultProps() {
    return {
      offset: 2,
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
      showScrollbar: {
        horizontal: true,
        vertical: false
      },
      vertical: true,
      horizontal: true
    };
  },

  verticalScrollbar: function verticalScrollbar(style, stickStyle) {
    if (this.props.vertical && this.props.showScrollbar.vertical) {
      return _react2['default'].createElement(
        'div',
        { className: 'Scrollbar', style: style },
        _react2['default'].createElement('div', { className: 'Scrollbar-stick', style: stickStyle, onMouseDown: this.props.onMouseDown.bind(null, 'y') })
      );
    } else {
      return null;
    }
  },

  horizontalScrollbar: function horizontalScrollbar(style, stickStyle) {
    if (this.props.horizontal && this.props.showScrollbar.horizontal) {
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { style: stickStyle, onMouseDown: this.props.onMouseDown.bind(null, 'x') })
      );
    } else {
      return null;
    }
  },

  render: function render() {
    if (!this.props.render) {
      return _react2['default'].createElement('div', null);
    }

    var verticalScrollbarHeight;
    var horizontalScrollbarWidth;

    if (this.props.scrollbarLength.vertical) {
      verticalScrollbarHeight = this.props.scrollbarLength.vertical;
    }

    if (this.props.scrollbarLength.horizontal) {
      horizontalScrollbarWidth = this.props.scrollbarLength.horizontal;
    }

    var scrollbarStyle = {
      borderRadius: 4,
      background: 'rgba(0, 0, 0, 0.5)',
      position: 'absolute',
      opacity: 1
    };

    var stickStyle = {
      background: 'rgba(255, 255, 255, 0.7)',
      position: 'absolute',
      borderRadius: 4
    };

    // TODO: clean this junk UP

    var scrollbarStyleVertical = _lodash2['default'].extend({
      width: this.props.scrollbarThickness,
      top: this.props.offset,
      height: verticalScrollbarHeight || 'auto',
      bottom: verticalScrollbarHeight ? 'auto' : this.props.offset,
      right: this.props.offset
    }, scrollbarStyle);

    var scrollbarStyleHorizontal = _lodash2['default'].extend({
      left: this.props.offset,
      bottom: this.props.offset,
      width: horizontalScrollbarWidth || 'auto',
      right: horizontalScrollbarWidth ? 'auto' : this.props.offset,
      height: this.props.scrollbarThickness
    }, scrollbarStyle);

    var scrollbarStickStyleVertical = _lodash2['default'].extend({
      width: this.props.scrollbarThickness,
      height: this.props.stickLength.vertical,
      right: 0,
      top: this.props.stickPosition.vertical
    }, stickStyle);

    var scrollbarStickStyleHorizontal = _lodash2['default'].extend({
      height: this.props.scrollbarThickness,
      width: this.props.stickLength.horizontal,
      left: this.props.stickPosition.horizontal
    }, stickStyle);

    return _react2['default'].createElement(
      'div',
      { className: 'Scrollbar-wrapper' },
      this.verticalScrollbar(scrollbarStyleVertical, scrollbarStickStyleVertical),
      this.horizontalScrollbar(scrollbarStyleHorizontal, scrollbarStickStyleHorizontal)
    );
  }
});

module.exports = Sticks;