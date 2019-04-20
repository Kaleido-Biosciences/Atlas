import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'semantic-ui-react';

export class PlateMenu extends Component {
  handleMenuItemClick = (e, { platemapid }) => {
    this.props.onMenuItemClick(platemapid);
  };

  render() {
    const { platemaps, activePlatemapId } = this.props;
    const menuItems = platemaps.map((platemap, i) => (
      <Menu.Item
        key={platemap.id}
        platemapid={platemap.id}
        active={activePlatemapId === platemap.id}
        name={`Plate ${i + 1}`}
        onClick={this.handleMenuItemClick}
      />
    ));
    return (
      <Menu pointing vertical>
        <Menu.Item
          name="add"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button primary onClick={this.props.onAddClick}>
            <Icon name="plus circle" /> Add Plate
          </Button>
        </Menu.Item>
        {menuItems}
      </Menu>
    );
  }
}

PlateMenu.propTypes = {
  platemaps: PropTypes.array.isRequired,
  activePlatemapId: PropTypes.number,
  onMenuItemClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};
