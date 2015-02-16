'use strict';

require('./scrollbar.scss');

var ScrollbarMixin = {
  getInitialState: function() {
    return {
      stickHeight: 0,
      stickPosition: 0,
      initialScrollTop: 0,
      initialPositionY: 0,
      initialMovement: false,
      scrolling: false,
      showScrollbar: true
    };
  },

  componentDidMount: function() {
    this.setState({
      stickHeight: this.getStickHeight(this.refs.scrollableContent.getDOMNode()),
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
  },

  getBoundingRect: function(element) {
    return element.getBoundingClientRect();
  },

  getStickHeight: function(element) {
    var contentHeight = element.scrollHeight;
    var scrollbarHeight = this.getBoundingRect(this.refs.scrollbar.getDOMNode()).height;
    this.ratio = scrollbarHeight / contentHeight;
    var stickHeight = scrollbarHeight * this.ratio;

    return stickHeight;
  },

  setStickPosition: function(event) {
    var scrollTop = event.target.scrollTop;
    this.setState({
      stickPosition: scrollTop * this.ratio
    });
  },

  scrollbarRequired: function() {
    return this.refs.scrollableContent.getDOMNode().scrollHeight > this.refs.scrollableContent.getDOMNode().clientHeight;
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

  containerClass: function() {
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