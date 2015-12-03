import React from 'react';
import style from '../../less/header.less';

var Header = React.createClass({
  render() {
    return (
      <header className="demo-header mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Colweb View Regression</span>
        </div>
      </header>
    )
  }
});

module.exports = Header;
