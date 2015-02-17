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
      showScrollbar: {
        horizontal: true,
        vertical: true
      },
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

    if (!_.isEqual(this.state.stickLength, newstickLength)) {
      this.setState({
        stickLength: newstickLength
      });
    }

    if (!_.isEqual(this.state.showScrollbar, this.scrollbarRequired())) {
      this.setState({
        showScrollbar: this.scrollbarRequired()
      });
    }

    if (!_.isEqual(this.state.contentDimensions, this.getContentDimensions())) {
      this.setState({
        contentDimensions: this.getContentDimensions()
      });
    }

    if (!_.isEqual(this.state.scrollbarLength, this.getscrollbarLength())) {
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
    return {
      horizontal: this.refs.scrollableContent.getDOMNode().scrollWidth > this.state.contentDimensions.width,
      vertical: this.refs.scrollableContent.getDOMNode().scrollHeight > this.state.contentDimensions.height
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
