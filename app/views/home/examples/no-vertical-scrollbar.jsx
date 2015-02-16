/** @jsx React.DOM */
React = require('react');
var ScrollbarMixin = require('./../../../utils/mixins/scrollbar.jsx');
var OverflowContent = require('./../../../utils/components/overflow-content.jsx');
var Scrollbar = require('./../../../utils/components/scrollbar.jsx');

require('./no-vertical-scrollbar.scss');

var VerticalScrollbar = React.createClass({
  mixins: [ScrollbarMixin],

  render: function() {
    return (
      <div style={this.scrollbarContainerStyle()} className={this.containerClass()}>
        <div style={this.scrollbarContentStyle()} ref="scrollableContent" onScroll={this.handleScroll} className="ScrollbarContent--noVertical">
          <p>Alex Woods (born October 7, 1982 in Houston, Texas) is an American soccer player, currently without a club. Woods played four years of college soccer at Trinity University. Undrafted out of college, Woods spent time with the reserve sides of FC Dallas and Houston Dynamo in Major League Soccer, featuring for both teams in the MLS Reserve Division, but never making a senior appearance for either team. After a brief stint with Charleston Battery in the USL First Division in 2005, Woods signed with Charlotte Eagles in 2007, and made his debut for the team on May 5, 2007, as a second half substitute in a game against Harrisburg City Islanders.</p>

          <Scrollbar
            ref="scrollbar"
            stickHeight={this.state.stickHeight}
            stickPosition={this.state.stickPosition}
            onMouseDown={this.handleMouseDown}
            showScrollbar={this.state.showScrollbar} />
        </div>
      </div>
    );
  }
});

module.exports = VerticalScrollbar;
