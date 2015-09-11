import React from 'react';
import {ScrollbarWrapper} from '../../../../index.js';
require('./vertical-scrollbar.css');

export default class BothScrollbar extends React.Component {
  render() {
    return (
      <ScrollbarWrapper className="ScrollbarContent--vertical">
        <img src={require('url!../../../assets/ghostface.jpg')} style={{display: 'block'}} width="1000"/>
      </ScrollbarWrapper>
    );
  }
};

