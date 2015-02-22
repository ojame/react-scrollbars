'use strict';
var React = require('react/addons');
var _ = require('lodash-node');

var style = { // TODO: there are js libs to polyfill these
  WebkitTouchCallout: 'none',
  userSelect: 'none'
};

var ScrollbarMixin = {
  getInitialState: function() {
    return {
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
      axis: null,
      initialMovement: false,
      scrolling: false,
      nativeScrollbarWidth: 15
    };
  },

  componentDidMount: function() {
    // This is a stupid hack, to get around: http://i.imgur.com/jEUO6l0.gif. TODO: remove it.
    var self = this;
    setTimeout(function() {
      self.forceUpdate();
    }, 1000);
  },

  getBoundingRect: function(element) {
    return element.getBoundingClientRect();
  },

  getStickLength: function() {
    if (!this.refs.scrollableContent) {
      return {};
    }

    var scrollbarLength = this.getScrollbarLength();
    this.ratio = {
      horizontal: scrollbarLength.horizontal / this.refs.scrollableContent.getDOMNode().scrollWidth,
      vertical: scrollbarLength.vertical / this.refs.scrollableContent.getDOMNode().scrollHeight
    };

    var horizontal = scrollbarLength.horizontal * this.ratio.horizontal;
    var vertical = scrollbarLength.vertical * this.ratio.vertical;

    return {
      horizontal: horizontal,
      vertical: vertical
    };
  },

  getContentDimensions: function() {
    if (!this.refs.scrollableContent) {
      return {};
    }

    return {
      height: this.refs.scrollableContent.getDOMNode().clientHeight,
      width: this.refs.scrollableContent.getDOMNode().clientWidth
    };
  },

  getScrollbarLength: function() {
    //scrollbarRequired
    var horizontal = this.getContentDimensions().width - ((this.state.scrollbarOffset || 0) * 2);
    var vertical = this.getContentDimensions().height - ((this.state.scrollbarOffset || 0) * 2);

    if (this.scrollbarRequired().vertical && this.scrollbarRequired().horizontal) {
      horizontal = horizontal - this.state.nativeScrollbarWidth;
      vertical = vertical - this.state.nativeScrollbarWidth;
    }

    return {
      horizontal: horizontal,
      vertical: vertical
    };
  },

  setStickPosition: function(event) {
    this.setState({
      stickPosition: {
        horizontal: event.target.scrollLeft * this.ratio.horizontal,
        vertical: event.target.scrollTop * this.ratio.vertical
      }
    });
  },

  scrollbarRequired: function() {
    if (!this.refs.scrollableContent) {
      return {};
    }

    var content = this.refs.scrollableContent.getDOMNode();
    return {
      horizontal: content.scrollWidth > this.getContentDimensions().width,
      vertical: content.scrollHeight > this.getContentDimensions().height
    };
  },

  handleScroll: function(event) {
    this.setStickPosition(event);
  },

  handleMouseDown: function(axis, event) {
    this.setState({
      axis: axis,
      initialPosition: {
        x: event.pageX,
        y: event.pageY
      },
      initialMovement: true,
      scrolling: true
    });

    document.addEventListener('mousemove', this.handleStickDrag);
    document.addEventListener('mouseup', this.handleMouseUp);
  },

  handleMouseUp: function() {
    this.setState({
      scrolling: false
    });

    document.removeEventListener('mousemove', this.handleStickDrag);
    document.removeEventListener('mouseup', this.handleMouseUp);
  },

  handleStickDrag: function(event) {
    var origin = this.state.axis === 'x' ? 'left' : 'top';

    var initialScrollPosition = this.state.initialScroll[origin];

    if (this.state.initialMovement) {
      initialScrollPosition = origin === 'left' ? this.refs.scrollableContent.getDOMNode().scrollLeft : this.refs.scrollableContent.getDOMNode().scrollTop;
      var initialScroll = _.extend({}, this.state.initialScroll);
      initialScroll[origin] = initialScrollPosition;

      this.setState({
        initialScroll: initialScroll,
        initialMovement: false
      });
    }

    var movement = {
      x: (this.state.initialPosition.x - event.pageX) * -1,
      y: (this.state.initialPosition.y - event.pageY) * -1
    };

    var scaledMovement = {
      x: movement.x / this.ratio.horizontal,
      y: movement.y / this.ratio.vertical
    };

    if (this.state.axis === 'x') {
      this.refs.scrollableContent.getDOMNode().scrollLeft = initialScrollPosition + scaledMovement.x;
    } else {
      this.refs.scrollableContent.getDOMNode().scrollTop = initialScrollPosition + scaledMovement.y;
    }
  },

  getScrollbarProps: function() {
    return {
      stickLength: this.getStickLength(),
      scrollbarLength: this.getScrollbarLength(),
      stickPosition: this.state.stickPosition,
      onMouseDown: this.handleMouseDown,
      showScrollbar: this.scrollbarRequired(),
      offset: this.state.scrollbarOffset
    };
  },

  containerClass: function() { // TODO: rename getStyle or something
    var cx = React.addons.classSet;

    return cx({
      'ScrollbarContainer': true,
      'ScrollbarContainer--scrolling': this.state.scrolling
    });
  },

  scrollbarContainerStyle: function() {
    return {
      position: 'relative',
      overflowX: 'hidden'
    };
  },

  scrollbarContentStyle: function() {
    return {
      paddingRight: this.scrollbarRequired().vertical ? this.state.nativeScrollbarWidth : 0,
      marginBottom: this.scrollbarRequired().horizontal ? (this.state.nativeScrollbarWidth * -1) : 0
    };
  }
};

module.exports = ScrollbarMixin;
