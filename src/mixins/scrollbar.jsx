'use strict';
var React = require('react/addons');

var style = { // TODO: there are js libs to polyfill these
  WebkitTouchCallout: 'none',
  userSelect: 'none'
};

var ScrollbarMixin = {
  getInitialState: function() {
    return {
      stickHeight: 0,
      contentHeight: 0,
      stickPosition: 0,
      initialScrollTop: 0,
      initialPositionY: 0,
      initialMovement: false,
      scrolling: false,
      showScrollbar: true,
      scrollbarHeight: 0
    };
  },

  componentDidMount: function() {
    this.setState({
      stickHeight: this.getStickHeight(this.refs.scrollableContent.getDOMNode()),
      contentHeight: this.getContentHeight(),
      scrollbarHeight: this.getScrollbarHeight(),
      showScrollbar: this.scrollbarRequired()
    });

    // This is a stupid hack, to get around: http://i.imgur.com/jEUO6l0.gif. TODO: remove it.
    var self = this;
    setTimeout(function() {
      self.forceUpdate();
    }, 1000);
  },

  componentDidUpdate: function() {
    var newStickHeight = this.getStickHeight(this.refs.scrollableContent.getDOMNode());

    if (this.state.stickHeight !== newStickHeight) {
      this.setState({
        stickHeight: newStickHeight
      });
    }

    if (this.state.showScrollbar !== this.scrollbarRequired()) {
      this.setState({
        showScrollbar: this.scrollbarRequired()
      });
    }

    if (this.state.contentHeight !== this.getContentHeight()) {
      this.setState({
        contentHeight: this.getContentHeight()
      });
    }

    if (this.state.scrollbarHeight !== this.getScrollbarHeight()) {
      this.setState({
        scrollbarHeight: this.getScrollbarHeight()
      });
    }
  },

  getBoundingRect: function(element) {
    return element.getBoundingClientRect();
  },

  getStickHeight: function(element) {
    var contentHeight = element.scrollHeight;
    var scrollbarHeight = this.state.scrollbarHeight;
    this.ratio = scrollbarHeight / contentHeight;
    var stickHeight = scrollbarHeight * this.ratio;

    return stickHeight;
  },

  getContentHeight: function() {
    return this.refs.scrollableContent.getDOMNode().clientHeight;
  },

  getScrollbarHeight: function() {
    return this.getContentHeight() - ((this.state.scrollbarOffset || 0) * 2);
  },

  setStickPosition: function(event) {
    var scrollTop = event.target.scrollTop;
    this.setState({
      stickPosition: scrollTop * this.ratio
    });
  },

  scrollbarRequired: function() {
    return this.refs.scrollableContent.getDOMNode().scrollHeight > this.state.contentHeight;
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
