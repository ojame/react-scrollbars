/** @jsx React.DOM */
React = require('react');
var ScrollbarMixin = require('./../../../utils/mixins/scrollbar.jsx');
var OverflowContent = require('./../../../utils/components/overflow-content.jsx');
var Scrollbar = require('./../../../utils/components/scrollbar.jsx');

require('./vertical-scrollbar.scss');

var VerticalScrollbar = React.createClass({
  mixins: [ScrollbarMixin],

  getInitialState: function() {
    return {
      scrollbarOffset: 2
    };
  },

  render: function() {
    return (
      <div style={this.scrollbarContainerStyle()} className={this.containerClass()}>
        <div style={this.scrollbarContentStyle()} ref="scrollableContent" onScroll={this.handleScroll} className="ScrollbarContent--vertical">
          <p>Alex Woods (born October 7, 1982 in Houston, Texas) is an American soccer player, currently without a club. Woods played four years of college soccer at Trinity University. Undrafted out of college, Woods spent time with the reserve sides of FC Dallas and Houston Dynamo in Major League Soccer, featuring for both teams in the MLS Reserve Division, but never making a senior appearance for either team. After a brief stint with Charleston Battery in the USL First Division in 2005, Woods signed with Charlotte Eagles in 2007, and made his debut for the team on May 5, 2007, as a second half substitute in a game against Harrisburg City Islanders.</p>
          <p>Scott Johnson (born 1952) is an American composer known for his pioneering use of recorded speech as musical melody. He was the recipient of a 2006 Guggenheim fellowship. His 1982 work John Somebody for electric guitar and recorded speech is an early example of speech melody framed in tonal harmony. It is named for the prominent tape loop of a single female voice, repeating variations on the phrases Johnson`s early works were created long before the advent of digital music editing.</p>
          <p>Seminal works of the minimalist music by Steve Reich including It`s Gonna Rain (1965) and Come Out (1966) have been of major importance for Scott Johnson`s compositions using the speaking language and tape loops to produce music. Johnson is also known for his distinctive crossing of American vernacular and art music traditions, making extensive use of electric guitar in concert works, and adapting popular music structures for art music genres such as the string quartet.</p>
          <p>Johnson has been widely commissioned by artists including the Kronos Quartet and the Saint Paul Chamber Orchestra. He lives in New York City. DynRBL stands for "Dynamic Realtime Black List". Dynamic nature of information coming from dynamic nature of sources. For example, it can be production mail systems with integrated sensors. Idea under dynamic RBL database is to describe malicious types of activity in covered address space. Dynamic nature solves the problem of constantly changing environment, as it exists in Internet.</p>
          <p>Reuben Uther (27 March 1791 - 27 July 1894) was a noted Australian merchant and manufacturer. Born in England, Uther began his career in seal skins before emigrating to Sydney in 1807 where he founded a hat making industry, a region of industry that he subsequently monopolised. He was a signatory to the petition to Major George Johnston calling for the deposing of the Governor of New South Wales, William Bligh, having only lived in the country for one year.</p>
          <p>Seminal works of the minimalist music by Steve Reich including It`s Gonna Rain (1965) and Come Out (1966) have been of major importance for Scott Johnson`s compositions using the speaking language and tape loops to produce music. Johnson is also known for his distinctive crossing of American vernacular and art music traditions, making extensive use of electric guitar in concert works, and adapting popular music structures for art music genres such as the string quartet.</p>
          <p>Johnson has been widely commissioned by artists including the Kronos Quartet and the Saint Paul Chamber Orchestra. He lives in New York City. DynRBL stands for "Dynamic Realtime Black List". Dynamic nature of information coming from dynamic nature of sources. For example, it can be production mail systems with integrated sensors. Idea under dynamic RBL database is to describe malicious types of activity in covered address space. Dynamic nature solves the problem of constantly changing environment, as it exists in Internet.</p>
          <p>Reuben Uther (27 March 1791 - 27 July 1894) was a noted Australian merchant and manufacturer. Born in England, Uther began his career in seal skins before emigrating to Sydney in 1807 where he founded a hat making industry, a region of industry that he subsequently monopolised. He was a signatory to the petition to Major George Johnston calling for the deposing of the Governor of New South Wales, William Bligh, having only lived in the country for one year.</p>
          <p>Seminal works of the minimalist music by Steve Reich including It`s Gonna Rain (1965) and Come Out (1966) have been of major importance for Scott Johnson`s compositions using the speaking language and tape loops to produce music. Johnson is also known for his distinctive crossing of American vernacular and art music traditions, making extensive use of electric guitar in concert works, and adapting popular music structures for art music genres such as the string quartet.</p>
          <p>Johnson has been widely commissioned by artists including the Kronos Quartet and the Saint Paul Chamber Orchestra. He lives in New York City. DynRBL stands for "Dynamic Realtime Black List". Dynamic nature of information coming from dynamic nature of sources. For example, it can be production mail systems with integrated sensors. Idea under dynamic RBL database is to describe malicious types of activity in covered address space. Dynamic nature solves the problem of constantly changing environment, as it exists in Internet.</p>
          <p>Reuben Uther (27 March 1791 - 27 July 1894) was a noted Australian merchant and manufacturer. Born in England, Uther began his career in seal skins before emigrating to Sydney in 1807 where he founded a hat making industry, a region of industry that he subsequently monopolised. He was a signatory to the petition to Major George Johnston calling for the deposing of the Governor of New South Wales, William Bligh, having only lived in the country for one year.</p>
          <p>Seminal works of the minimalist music by Steve Reich including It`s Gonna Rain (1965) and Come Out (1966) have been of major importance for Scott Johnson`s compositions using the speaking language and tape loops to produce music. Johnson is also known for his distinctive crossing of American vernacular and art music traditions, making extensive use of electric guitar in concert works, and adapting popular music structures for art music genres such as the string quartet.</p>
          <p>Johnson has been widely commissioned by artists including the Kronos Quartet and the Saint Paul Chamber Orchestra. He lives in New York City. DynRBL stands for "Dynamic Realtime Black List". Dynamic nature of information coming from dynamic nature of sources. For example, it can be production mail systems with integrated sensors. Idea under dynamic RBL database is to describe malicious types of activity in covered address space. Dynamic nature solves the problem of constantly changing environment, as it exists in Internet.</p>
          <p>Reuben Uther (27 March 1791 - 27 July 1894) was a noted Australian merchant and manufacturer. Born in England, Uther began his career in seal skins before emigrating to Sydney in 1807 where he founded a hat making industry, a region of industry that he subsequently monopolised. He was a signatory to the petition to Major George Johnston calling for the deposing of the Governor of New South Wales, William Bligh, having only lived in the country for one year.</p>

          <Scrollbar
            stickHeight={this.state.stickHeight}
            stickPosition={this.state.stickPosition}
            onMouseDown={this.handleMouseDown}
            showScrollbar={this.state.showScrollbar}
            offset={this.state.scrollbarOffset} />
        </div>
      </div>
    );
  }
});

module.exports = VerticalScrollbar;
