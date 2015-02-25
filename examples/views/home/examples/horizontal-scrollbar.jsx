var React = require('react');
var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;
require('./horizontal-scrollbar.scss');

var HorizontalScrollbar = React.createClass({
  render: function() {
    return (
      <ScrollbarWrapper className="ScrollbarContent--horizontal">
        <img onLoad={this.imageLoaded} src="./../../assets/lift.jpg" style={{display: 'block'}} width="1000"/>
      </ScrollbarWrapper>
    );
  }
});

module.exports = HorizontalScrollbar;

