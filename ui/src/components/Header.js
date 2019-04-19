import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export class Header extends Component {
  render() {
    const { logo } = this.props;
    return (
      <Menu fixed="top" inverted>
        <Menu.Item header>
          <Image
            size="mini"
            src={logo}
            style={{ marginRight: '1.5em', height: '1.5em', width: '1.5em' }}
          />
          Atlas
        </Menu.Item>
      </Menu>
    );
  }
}

Header.propTypes = {
  logo: PropTypes.string,
};
