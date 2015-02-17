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
    var scrollbarLength = this.state.scrollbarLength;
    this.ratio = {
      horizontal: scrollbarLength.horizontal / element.scrollWidth,
      vertical: scrollbarLength.vertical / element.scrollHeight
    };

    var horizontal = scrollbarLength.horizontal * this.ratio.horizontal;
    var vertical = scrollbarLength.vertical * this.ratio.vertical;

    return {
      horizontal: horizontal,
      vertical: vertical
    };
  },

  getContentDimensions: function() {
    return {
      height: this.refs.scrollableContent.getDOMNode().clientHeight,
      width: this.refs.scrollableContent.getDOMNode().clientWidth
    };
  },

  getscrollbarLength: function() {
    return {
      horizontal: this.state.contentDimensions.width - ((this.state.scrollbarOffset || 0) * 2),
      vertical: this.state.contentDimensions.height - ((this.state.scrollbarOffset || 0) * 2)
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
    var scaledMovement = movement / this.ratio.vertical;
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
