import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'semantic-ui-react';

export class PlateMapMenu extends Component {
  handleMenuItemClick = (e, { platemapid }) => {
    this.props.onMenuItemClick(platemapid);
  };

  render() {
    const { plateMaps } = this.props;
    const menuItems = plateMaps.map((plateMap, i) => (
      <Menu.Item
        key={plateMap.id}
        platemapid={plateMap.id}
        active={plateMap.active}
        name={`Plate Map ${i + 1}`}
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
            <Icon name="plus circle" /> Add Plate Map
          </Button>
        </Menu.Item>
        {menuItems}
      </Menu>
    );
  }
}

PlateMapMenu.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};
