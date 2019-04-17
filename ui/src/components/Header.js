import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';

const logo = require('../images/kaleido_logo.png');

export class Header extends Component {
  render() {
    return (
      <Menu fixed="top" inverted>
        <Menu.Item header>
          <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
          Atlas
        </Menu.Item>
      </Menu>
    );
  }
}
