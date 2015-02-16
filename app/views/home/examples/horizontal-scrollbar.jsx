/** @jsx React.DOM */
React = require('react');
var ScrollbarMixin = require('./../../../utils/mixins/scrollbar.jsx');
var OverflowContent = require('./../../../utils/components/overflow-content.jsx');
var Scrollbar = require('./../../../utils/components/scrollbar.jsx');

require('./vertical-scrollbar.scss');

var VerticalScrollbar = React.createClass({
  mixins: [ScrollbarMixin],

  getInitialState: function() {
    return {
      scrollbarOffset: 2
    };
  },


  render: function() {
    return (
      <div style={this.scrollbarContainerStyle()} className={this.containerClass()}>
        <div style={this.scrollbarContentStyle()} ref="scrollableContent" onScroll={this.handleScroll} className="ScrollbarContent--vertical">
          <img src="http://i.ytimg.com/vi/7RtDlXRkPuE/maxresdefault.jpg" />

          <Scrollbar
            stickHeight={this.state.stickHeight}
            scrollbarHeight={this.state.scrollbarHeight}
            stickPosition={this.state.stickPosition}
            onMouseDown={this.handleMouseDown}
            showScrollbar={this.state.showScrollbar}
            offset={this.state.scrollbarOffset} />
        </div>
      </div>
    );
  }
});

module.exports = VerticalScrollbar;
