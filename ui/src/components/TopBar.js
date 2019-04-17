import React, { Component } from 'react';

const logo = require('../images/kaleido_logo.png');

export class TopBar extends Component {
  render() {
    return (
      <div><img width={12} src={logo} alt="" />Atlas</div>
    );
  }
}
