import React from 'react';
import style from '../../less/buttons.less';

var Button = React.createClass({
  render() {
    return (
      <button
        name={this.props.name}
        className={this.props.class}
        onClick={this.props.clickHandler}
      >{this.props.label}</button>
    );
  }
});

module.exports = Button;
