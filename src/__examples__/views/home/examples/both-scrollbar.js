import React from 'react';
import {ScrollbarWrapper} from '../../../../index.js';
require('./vertical-scrollbar.css');

var BothScrollbar = React.createClass({
  render: function() {
    return (
      <ScrollbarWrapper className="ScrollbarContent--vertical">
        <img src={require('url!../../../assets/ghostface.jpg')} style={{display: 'block'}} width="1000"/>
      </ScrollbarWrapper>
    );
  }
});

module.exports = BothScrollbar;

