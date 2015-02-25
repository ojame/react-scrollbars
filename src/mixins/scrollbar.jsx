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
      nativeScrollbarWidth: 15,
      firstRender: null
    };
  },

  getDefaultProps: function() {
    return {
      scrollbarOffset: 2
    };
  },

  componentDidMount: function() {
    this.setState({
      firstRender: true
    });
  },

  componentDidUpdate: function() {
    if (this.state.firstRender) {
      this.setState({
        firstRender: false
      });
    }
  },

  getBoundingRect: function(element) {
    return element.getBoundingClientRect();
  },

  getRatio: function() {
    if (!this.refs.scrollableContent) {
      return {};
    }

    var scrollbarLength = this.getScrollbarLength();

    return {
      horizontal: scrollbarLength.horizontal / this.refs.scrollableContent.getDOMNode().scrollWidth,
      vertical: scrollbarLength.vertical / this.refs.scrollableContent.getDOMNode().scrollHeight
    };
  },

  getStickLength: function() {
    if (!this.refs.scrollableContent) {
      return {};
    }

    var scrollbarLength = this.getScrollbarLength();
    var horizontal = scrollbarLength.horizontal * this.getRatio().horizontal;
    var vertical = scrollbarLength.vertical * this.getRatio().vertical;

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
    if (this.scrollbarRequired().vertical) {
      this.refs.scrollableContent.getDOMNode().style.paddingRight = this.state.nativeScrollbarWidth + 'px';
    }

    if (this.scrollbarRequired().horizontal) {
      this.refs.scrollableContent.getDOMNode().style.marginBottom = this.state.nativeScrollbarWidth * -1 + 'px';
    }


    var horizontal = this.getContentDimensions().width - ((this.props.scrollbarOffset || 0) * 2);
    var vertical = this.getContentDimensions().height - ((this.props.scrollbarOffset || 0) * 2);

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
        horizontal: event.target.scrollLeft * this.getRatio().horizontal,
        vertical: event.target.scrollTop * this.getRatio().vertical
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
    // TODO: this needs refactoring
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
      x: movement.x / this.getRatio().horizontal,
      y: movement.y / this.getRatio().vertical
    };

    if (this.state.axis === 'x') {
      this.refs.scrollableContent.getDOMNode().scrollLeft = initialScrollPosition + scaledMovement.x;
    } else {
      this.refs.scrollableContent.getDOMNode().scrollTop = initialScrollPosition + scaledMovement.y;
    }
  },

  imageLoaded: function() {
    this.forceUpdate();
  },

  getScrollbarProps: function() {
    if (this.state.firstRender !== false) {
      return {
        render: false
      };
    }

    return {
      render: true,
      stickLength: this.getStickLength(),
      scrollbarLength: this.getScrollbarLength(),
      stickPosition: this.state.stickPosition,
      onMouseDown: this.handleMouseDown,
      showScrollbar: this.scrollbarRequired(),
      offset: this.props.scrollbarOffset
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
  }
};

module.exports = ScrollbarMixin;
