/** @jsx React.DOM */
React = require('react');

require('./button.scss');

var Button = React.createClass({
  render: function() {
    return (
      <button type={this.props.type} className="Button">{this.props.children}</button>
    );
  }
});

module.exports = Button;
