import React from 'react';

var style = {
  background: 'transparent',
  border: '2px solid #1ABC9C',
  borderRadius: 2,
  textYransform: 'uppercase',
  padding: '0.5em 1em'
};

export default class Button extends React.Component {
  render() {
    return (
      <button style={style} type={this.props.type} className="Button">{this.props.children}</button>
    );
  }
};
