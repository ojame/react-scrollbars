'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Wrapper = (function (_React$Component) {
  _inherits(Wrapper, _React$Component);

  function Wrapper() {
    var _this = this;

    _classCallCheck(this, Wrapper);

    _get(Object.getPrototypeOf(Wrapper.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      stickPosition: {
        horizontal: 0,
        vertical: 0
      },
      initialScroll: {
        left: 0,
        top: 0
      },
      initialPosition: {
        x: 0,
        y: 0
      },
      scrollWidth: 0,
      scrollHeight: 0,
      axis: null,
      initialMovement: false,
      scrolling: false,
      nativeScrollbarWidth: 0,
      firstRender: null,
      width: 0,
      height: 0
    };

    this.componentDidMount = function () {
      window.addEventListener('message', _this.handleReceive, false);

      var scrollbarElement = document.createElement('div');
      scrollbarElement.style.width = '100px';
      scrollbarElement.style.height = '100px';
      scrollbarElement.style.overflow = 'scroll';
      scrollbarElement.style.position = 'absolute';
      scrollbarElement.style.top = '-100%';
      scrollbarElement.style.left = '-100%';
      document.body.appendChild(scrollbarElement);

      _this.setState({
        nativeScrollbarWidth: scrollbarElement.offsetWidth - scrollbarElement.clientWidth,
        firstRender: true
      }, function () {
        document.body.removeChild(scrollbarElement);
      });
    };

    this.componentWillUnmount = function () {
      window.removeEventListener('message', _this.handleReceive, false);
    };

    this.handleReceive = function (event) {
      var data = event.data;

      if (typeof _this[data.func] === 'function') {
        _this[data.func]();
      }
    };

    this.componentDidUpdate = function () {
      var contentDimensions = _this.getContentDimensions();
      if (contentDimensions.scrollWidth !== _this.state.scrollWidth || contentDimensions.scrollHeight !== _this.state.scrollHeight) {
        _this.setState({
          scrollWidth: contentDimensions.scrollWidth,
          scrollHeight: contentDimensions.scrollHeight
        });

        _this.handleContentResize();
      }

      if (_this.state.firstRender) {
        _this.setState({
          firstRender: false
        });
      }
    };

    this.getRatio = function () {
      if (!_this.refs.scrollableContent) {
        return {};
      }

      var element = _this.refs.scrollableContent.getDOMNode();

      return {
        horizontal: _this.getContentDimensions().width / element.scrollWidth,
        vertical: _this.getContentDimensions().height / element.scrollHeight
      };
    };

    this.getStickLength = function () {
      if (!_this.refs.scrollableContent) {
        return {};
      }

      var scrollbarLength = _this.getScrollbarLength();
      var horizontal = scrollbarLength.horizontal * _this.getRatio().horizontal;
      var vertical = scrollbarLength.vertical * _this.getRatio().vertical;

      return {
        horizontal: horizontal,
        vertical: vertical
      };
    };

    this.getContentDimensions = function () {
      if (!_this.refs.scrollableContent) {
        return {};
      }

      var element = _this.refs.scrollableContent.getDOMNode();

      return {
        height: element.clientHeight,
        scrollHeight: element.scrollHeight,
        scrollWidth: element.scrollWidth,
        width: element.clientWidth
      };
    };

    this.getScrollbarLength = function () {
      var horizontal = _this.getContentDimensions().width - _this.props.scrollbarOffset * 2;
      var vertical = _this.getContentDimensions().height - _this.props.scrollbarOffset * 2;

      if (_this.scrollbarRequired().both) {
        horizontal = horizontal - _this.state.nativeScrollbarWidth;
        vertical = vertical - _this.state.nativeScrollbarWidth;
      }

      return {
        horizontal: horizontal,
        vertical: vertical
      };
    };

    this.calculateStickPosition = function (left, top) {
      var scrollbarRatioWidth = _this.getScrollbarLength().horizontal / _this.getContentDimensions().scrollWidth;
      var scrollbarRatioHeight = _this.getScrollbarLength().vertical / _this.getContentDimensions().scrollHeight;

      return {
        horizontal: left * scrollbarRatioWidth,
        vertical: top * scrollbarRatioHeight
      };
    };

    this.scrollbarRequired = function () {
      if (!_this.refs.scrollableContent) {
        return {};
      }

      var dimensions = _this.getContentDimensions();
      var horizontalRequired = dimensions.scrollWidth - _this.props.overflowTolerance > dimensions.width;
      var verticalRequired = dimensions.scrollHeight - _this.props.overflowTolerance > dimensions.height;

      return {
        horizontal: horizontalRequired,
        vertical: verticalRequired,
        both: horizontalRequired && verticalRequired
      };
    };

    this.handleScroll = function (event) {
      _this.setState({
        stickPosition: _this.calculateStickPosition(event.target.scrollLeft, event.target.scrollTop)
      });
    };

    this.handleMouseDown = function (axis, event) {
      event.preventDefault();

      _this.setState({
        axis: axis,
        initialPosition: {
          x: event.pageX,
          y: event.pageY
        },
        initialMovement: true,
        scrolling: true
      });

      document.addEventListener('mousemove', _this.handleStickDrag);
      document.addEventListener('mouseup', _this.handleMouseUp);
    };

    this.handleMouseUp = function () {
      _this.setState({
        scrolling: false
      });

      document.removeEventListener('mousemove', _this.handleStickDrag);
      document.removeEventListener('mouseup', _this.handleMouseUp);
    };

    this.handleStickDrag = function (event) {
      // TODO: this needs refactoring
      var origin = _this.state.axis === 'x' ? 'left' : 'top';

      var initialScrollPosition = _this.state.initialScroll[origin];

      if (_this.state.initialMovement) {
        initialScrollPosition = origin === 'left' ? _this.refs.scrollableContent.getDOMNode().scrollLeft : _this.refs.scrollableContent.getDOMNode().scrollTop;
        var initialScroll = _lodash2['default'].extend({}, _this.state.initialScroll);
        initialScroll[origin] = initialScrollPosition;

        _this.setState({
          initialScroll: initialScroll,
          initialMovement: false
        });
      }

      var movement = {
        x: (_this.state.initialPosition.x - event.pageX) * -1,
        y: (_this.state.initialPosition.y - event.pageY) * -1
      };

      var scaledMovement = {
        x: movement.x / _this.getRatio().horizontal,
        y: movement.y / _this.getRatio().vertical
      };

      if (_this.state.axis === 'x') {
        _this.refs.scrollableContent.getDOMNode().scrollLeft = initialScrollPosition + scaledMovement.x;
      } else {
        _this.refs.scrollableContent.getDOMNode().scrollTop = initialScrollPosition + scaledMovement.y;
      }
    };

    this.handleContentResize = function () {
      _this.forceUpdate();
    };

    this.getScrollbarProps = function () {
      if (_this.state.firstRender !== false) {
        return {
          render: false
        };
      }

      return {
        render: true,
        stickLength: _this.getStickLength(),
        scrollbarLength: _this.getScrollbarLength(),
        stickPosition: _this.state.stickPosition,
        onMouseDown: _this.handleMouseDown,
        showScrollbar: _this.scrollbarRequired(),
        offset: _this.props.scrollbarOffset
      };
    };

    this.containerClass = function () {
      // TODO: rename getStyle or something
      var cx = _reactAddons2['default'].addons.classSet;

      return cx({
        'ScrollbarContainer': true,
        'ScrollbarContainer--scrolling': _this.state.scrolling
      });
    };

    this.scrollbarContentStyle = function () {
      var style = {};

      if (_this.scrollbarRequired().vertical) {
        style.marginRight = _this.state.nativeScrollbarWidth * -1;
        //style.width = this.getContentDimensions().width + (this.state.nativeScrollbarWidth * 2);
      }

      if (_this.scrollbarRequired().horizontal) {
        style.marginBottom = _this.state.nativeScrollbarWidth * -1;
        //style.height = this.getContentDimensions().height + (this.state.nativeScrollbarWidth * 2);
      }

      return style;
    };
  }

  _createClass(Wrapper, [{
    key: 'onResize',
    value: function onResize() {
      this.handleContentResize();
    }
  }], [{
    key: 'defaultProps',
    value: {
      scrollbarOffset: 2,
      overflowTolerance: 3
    },
    enumerable: true
  }]);

  return Wrapper;
})(_reactAddons2['default'].Component);

exports['default'] = Wrapper;
;
module.exports = exports['default'];