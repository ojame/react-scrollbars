var React = require('react');
var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;
require('./horizontal-scrollbar.scss');

var HorizontalScrollbar = React.createClass({
  render: function() {
    return (
      <ScrollbarWrapper className="ScrollbarContent--horizontal" vertical={false}>
        <img src="./../../assets/lift.jpg" style={{display: 'block'}} width="1000"/>
      </ScrollbarWrapper>
    );
  }
});

module.exports = HorizontalScrollbar;

