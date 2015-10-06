'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = Scrollbars;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _sticks = require('./sticks');

var _sticks2 = _interopRequireDefault(_sticks);

function Scrollbars(Component, props) {
  return (function (_Wrapper) {
    _inherits(ScrollbaredContent, _Wrapper);

    function ScrollbaredContent() {
      _classCallCheck(this, ScrollbaredContent);

      _get(Object.getPrototypeOf(ScrollbaredContent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ScrollbaredContent, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { style: { position: 'relative', overflow: 'hidden' }, className: 'rs-container' },
          _react2['default'].createElement(
            'div',
            { style: this.scrollbarContentStyle(), onScroll: this.handleScroll, className: 'rs-content' },
            _react2['default'].createElement(Component, _extends({}, this.props, { ref: 'scrollableContent' })),
            _react2['default'].createElement('iframe', { style: { width: '100%', height: '100%', position: 'absolute', top: '-100%', left: '-100%' }, frameBorder: '0', src: 'javascript:window.onresize=function(){parent.postMessage({\'func\': \'onResize\'}, \'*\')}' })
          ),
          _react2['default'].createElement(_sticks2['default'], _extends({}, this.getScrollbarProps(), props))
        );
      }
    }]);

    return ScrollbaredContent;
  })(_wrapper2['default']);
}

;
module.exports = exports['default'];