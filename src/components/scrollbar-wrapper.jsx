'use strict';
var React = require('react/addons');
var _ = require('lodash-node');

var ScrollbarMixin = require('../mixins/scrollbar');
var Scrollbar = require('./scrollbar');

var ScrollbarWrapper = React.createClass({
  mixins: [ScrollbarMixin],

  render: function() {
    return (
      <div style={this.scrollbarContainerStyle()} className={this.containerClass()}>
        <div ref="scrollableContent" onScroll={this.handleScroll} className={this.props.className}>
          {this.props.children}

          <Scrollbar
            {... this.getScrollbarProps()} />
        </div>
      </div>
    );
  }
});

module.exports = ScrollbarWrapper;