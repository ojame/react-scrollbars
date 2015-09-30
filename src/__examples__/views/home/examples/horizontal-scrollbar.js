import React from 'react';
import {Scrollbars} from '../../../../index.js';
require('./horizontal-scrollbar.css');

export default Scrollbars(React.createClass({
  render() {
    return (
      <div className="ScrollbarContent--horizontal">
        <div className="ScrollbarContent--horizontal-column">
          Love
        </div>

        <div className="ScrollbarContent--horizontal-column">
          Don`t
        </div>

        <div className="ScrollbarContent--horizontal-column">
          Live
        </div>

        <div className="ScrollbarContent--horizontal-column">
          Here
        </div>

        <div className="ScrollbarContent--horizontal-column">
          No
        </div>

        <div className="ScrollbarContent--horizontal-column">
          More
        </div>
      </div>
    );
  }
}));