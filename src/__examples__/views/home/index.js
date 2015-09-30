import React from 'react';
import ScrollbarExample from './partials/scrollbar.js';
import CustomScrollbar from './partials/custom-scrollbar.js';

require('./index.css');

export default class HomeView extends React.Component {
  state = {
    vertical: true,
    horizontal: false,
  };

  handleVertical = (evt) => {
    this.setState({
      vertical: !this.state.vertical,
    })
  };

  handleHorizontal = (evt) => {
    this.setState({
      horizontal: !this.state.horizontal,
    })
  };

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <h1>React-Scrollbars</h1>
          <h2><a href="https://github.com/ojame/react-scrollbar">view on github</a></h2>
        </header>

        <div className="Home-container">
          <aside className="Home-navigation">
            <p>
              Super simple custom scrollbars. Works on Chrome, Firefox, Safari, IE10+ and mobile.
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
              <h3>Example</h3>

              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={this.handleVertical}
                    checked={this.state.vertical}
                  />
                    Vertical
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={this.handleHorizontal}
                    checked={this.state.horizontal}
                  />
                    Horizontal
                </label>
              </div>

              <ScrollbarExample
                vertical={this.state.vertical}
                horizontal={this.state.horizontal}
              />
            </div>

            <div className="Home-content-block" id="implementation">
              <h3>Implementation</h3>
              <div className="markdown">
                <div dangerouslySetInnerHTML={{__html: require('../../../../README.md')}}></div>
              </div>
            </div>
          </div>
        </div>

        <footer className="Home-footer">
          made by <a href="https://twitter.com/_ojame" target="_blank">@_ojame</a> and <a href="https://twitter.com/ncreen_same" target="_blank">@nscreen_same</a> on Macropod (<a href="https://twitter.com/MacropodHQ" target="_blank">@MacropodHQ</a>) time.
        </footer>

      </div>
    );
  }
};