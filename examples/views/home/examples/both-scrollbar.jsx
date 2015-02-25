var React = require('react');
var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;
require('./vertical-scrollbar.scss');

var BothScrollbar = React.createClass({
  render: function() {
    return (
      <ScrollbarWrapper className="ScrollbarContent--vertical">
        <img onLoad={this.imageLoaded} src="./../../assets/lift.jpg" style={{display: 'block'}} width="1000"/>
      </ScrollbarWrapper>
    );
  }
});

module.exports = BothScrollbar;

