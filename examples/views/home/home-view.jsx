/** @jsx React.DOM */

var React = require('react');
var BothScrollbar = require('./examples/both-scrollbar.jsx');
var HorizontalScrollbar = require('./examples/horizontal-scrollbar.jsx');
var VerticalScrollbar = require('./examples/vertical-scrollbar.jsx');

var Markdown2HTML = require('react-markdown-to-html');

require('./home-view.scss');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <div className="Home">
        <header className="Home-header">
          <h1>React-Scrollbars</h1>
          <h2>stateful scrollbars that react loves</h2>
        </header>

        <div className="Home-container">
          <aside className="Home-navigation">
            <p>
              Super simple custom scrollbars, because OSX Lion decided not to play ball.
            </p>
            <nav>
              <ul>
                <li><a href="#vertical">Vertical</a></li>
                <li><a href="#horizontal">Horizontal</a></li>
                <li><a href="#both">Both</a></li>
                <li><a href="#implementation">Implementation</a></li>
              </ul>
            </nav>
          </aside>

          <div className="Home-content">
            <div className="Home-content-block" id="vertical">
              <h3>Vertical Scrollbars</h3>
              <VerticalScrollbar />
            </div>

            <div className="Home-content-block" id="horizontal">
              <h3>Horizontal Scrollbars</h3>
              <HorizontalScrollbar />
            </div>

            <div className="Home-content-block" id="both">
              <h3>Horizontal and Vertical Scrollbars</h3>
              <BothScrollbar />
            </div>

            <div className="Home-content-block" id="implementation">
              <h3>Implementation</h3>
              <div className="markdown">
                {<Markdown2HTML src="README.md" />}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});