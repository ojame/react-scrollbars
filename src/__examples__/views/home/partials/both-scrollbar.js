import React from 'react';
import {Scrollbars} from '../../../../index.js';
require('./vertical-scrollbar.css');

export default class BothScrollbar extends React.Component {
  render() {
    return (
      <Scrollbars className="ScrollbarContent--vertical">
        <img src={require('url!../../../assets/ghostface.jpg')} style={{display: 'block'}} width="1000"/>
      </Scrollbars>
    );
  }
};

