import React from 'react';
import Wrapper from './wrapper';
import Sticks from './sticks';

export default function Scrollbars(Component) {
  return class ScrollbaredContent extends Wrapper {
    render() {
      return (
        <div style={{position: 'relative',overflow: 'hidden'}}>
          <div style={this.scrollbarContentStyle()} onScroll={this.handleScroll}>
            <Component {...this.props} ref="scrollableContent" />
            <iframe style={{width: '100%', height: '100%', position: 'absolute', top: '-100%', left: '-100%'}} frameBorder="0" src="javascript:window.onresize=function(){parent.postMessage({'func': 'onResize'}, '*')}" ></iframe>
          </div>

          <Sticks
            {... this.props}
            {... this.getScrollbarProps()} />
        </div>
      );
    }
  }
};