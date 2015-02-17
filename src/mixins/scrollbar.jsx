'use strict';
var React = require('react/addons');

var style = { // TODO: there are js libs to polyfill these
  WebkitTouchCallout: 'none',
  userSelect: 'none'
};

var ScrollbarMixin = {
  getInitialState: function() {
    return {
      stickLength: {
        horizontal: 0,
        vertical: 0
      },
      contentDimensions: {
        height: 0,
        width: 0
      },
      stickPosition: {
        horizontal: 0,
        vertical: 0
      },
      initialScrollTop: 0,
      initialPositionY: 0,
      initialMovement: false,
      scrolling: false,
      showScrollbar: true,
      scrollbarLength: {
        horizontal: 0,
        vertical: 0
      }
    };
  },

  componentDidMount: function() {
    this.setState({
      stickLength: this.getstickLength(this.refs.scrollableContent.getDOMNode()),
      contentDimensions: this.getContentDimensions(),
      scrollbarLength: this.getscrollbarLength(),
      showScrollbar: this.scrollbarRequired()
    });

    // This is a stupid hack, to get around: http://i.imgur.com/jEUO6l0.gif. TODO: remove it.
    var self = this;
    setTimeout(function() {
      self.forceUpdate();
    }, 1000);
  },

  componentDidUpdate: function() {
    var newstickLength = this.getstickLength(this.refs.scrollableContent.getDOMNode());

    if (this.state.stickLength.vertical !== newstickLength.vertical) {
      this.setState({
        stickLength: newstickLength
      });
    }

    if (this.state.showScrollbar !== this.scrollbarRequired()) {
      this.setState({
        showScrollbar: this.scrollbarRequired()
      });
    }

    if (this.state.contentDimensions.height !== this.getContentDimensions().height) {
      this.setState({
        contentDimensions: this.getContentDimensions()
      });
    }

    if (this.state.scrollbarLength.vertical !== this.getscrollbarLength().vertical) {
      this.setState({
        scrollbarLength: this.getscrollbarLength()
      });
    }
  },

  getBoundingRect: function(element) {
    return element.getBoundingClientRect();
  },

  getstickLength: function(element) {
    var contentDimensions = element.scrollHeight;
    var scrollbarLength = this.state.scrollbarLength;
    this.ratio = scrollbarLength.vertical / contentDimensions;
    var vertical = scrollbarLength.vertical * this.ratio;

    return {
      horizontal: 0,
      vertical: vertical
    };
  },

  getContentDimensions: function() {
    return {
      height: this.refs.scrollableContent.getDOMNode().clientHeight,
      width: 0
    };
  },

  getscrollbarLength: function() {
    return {
      horizontal: 0,
      vertical: this.getContentDimensions().height - ((this.state.scrollbarOffset || 0) * 2)
    };
  },

  setStickPosition: function(event) {
    var scrollTop = event.target.scrollTop;
    this.setState({
      stickPosition: {
        horizontal: 0,
        vertical: scrollTop * this.ratio
      }
    });
  },

  scrollbarRequired: function() {
    return this.refs.scrollableContent.getDOMNode().scrollHeight > this.state.contentDimensions.height;
  },

  handleScroll: function(event) {
    this.setStickPosition(event);
  },

  handleMouseDown: function(event) {
    this.setState({
      initialPositionY: event.pageY,
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
    var initialScrollTop = this.state.initialScrollTop;

    if (this.state.initialMovement) {
      initialScrollTop = this.refs.scrollableContent.getDOMNode().scrollTop;

      this.setState({
        initialScrollTop: initialScrollTop,
        initialMovement: false
      });
    }

    var movement = (this.state.initialPositionY - event.pageY) * -1;
    var scaledMovement = movement / this.ratio;
    this.refs.scrollableContent.getDOMNode().scrollTop = initialScrollTop + scaledMovement;
  },

  getScrollbarProps: function() {
    return {
      stickLength: this.state.stickLength,
      scrollbarLength: this.state.scrollbarLength,
      stickPosition: this.state.stickPosition,
      onMouseDown: this.handleMouseDown,
      showScrollbar: this.state.showScrollbar,
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
      paddingRight: 15
    };
  }
};

module.exports = ScrollbarMixin;
