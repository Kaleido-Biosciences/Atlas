import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown } from 'semantic-ui-react';

import styles from './PlateTabBar.module.css';

export class PlateTab extends Component {
  state = {
    dropdownOpen: false,
  };
  handleClick = () => {
    const { plate } = this.props;
    if (this.props.onClick) {
      this.props.onClick(plate.id);
    }
  };
  handleDropdownClick = e => {
    e.stopPropagation();
    const { plate } = this.props;
    if (plate.active) {
      this.setState({ dropdownOpen: !this.state.dropdownOpen });
    } else {
      this.handleClick();
    }
  };
  handleDropdownBlur = () => {
    this.setState({ dropdownOpen: false });
  };
  handleItemClick = (e, data) => {
    if (data.name === 'clone') {
      if (this.props.onCloneMenuItemClick) {
        this.props.onCloneMenuItemClick();
      }
    } else if (data.name === 'delete') {
      if (this.props.onDeleteMenuItemClick) {
        this.props.onDeleteMenuItemClick();
      }
    }
  };
  render() {
    const { plate } = this.props;
    const tabClass = classNames(styles.plateTab, {
      [styles.active]: plate.active,
    });
    return (
      <div className={tabClass} onClick={this.handleClick}>
        <span>{`Plate ${plate.id}`}</span>
        <Dropdown
          open={this.state.dropdownOpen}
          onClick={this.handleDropdownClick}
          onBlur={this.handleDropdownBlur}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={this.handleItemClick}
              icon="clone outline"
              text="Clone..."
              name="clone"
            />
            <Dropdown.Item
              onClick={this.handleItemClick}
              icon="trash"
              text="Delete..."
              name="delete"
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

PlateTab.propTypes = {
  plate: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onCloneMenuItemClick: PropTypes.func,
  onDeleteMenuItemClick: PropTypes.func,
};
