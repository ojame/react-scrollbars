## Installation

```
npm install react-scrollbars --save
```

## Basic usage

```
var React = require('react');
var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;

var Component = React.createClass({
  render: function() {
    return (
      <ScrollbarWrapper>
        <div>
            content
        </div>
      </ScrollbarWrapper>
    );
  }
});

module.exports = Component;
```