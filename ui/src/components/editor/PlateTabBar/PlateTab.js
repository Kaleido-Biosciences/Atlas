import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown, Portal, Icon } from 'semantic-ui-react';

import styles from './PlateTabBar.module.css';

export class PlateTab extends Component {
  state = {
    styles: {},
  };
  handleClick = () => {
    const { plate } = this.props;
    if (this.props.onClick) {
      this.props.onClick({ plateId: plate.id });
    }
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
  handleOpen = (e, data) => {
    this.setState({
      styles: {
        top: e.nativeEvent.pageY + 'px',
        left: e.nativeEvent.pageX + 'px',
      },
    });
  };
  render() {
    const { plate, plateIndex } = this.props;
    const tabClass = classNames(styles.plateTab, {
      [styles.active]: plate.active,
    });
    const plateNumber = plateIndex + 1;
    return (
      <div className={tabClass} onClick={this.handleClick}>
        <span>{`Plate ${plateNumber}`}</span>
        <Portal
          closeOnTriggerClick
          openOnTriggerClick
          trigger={<Icon name="caret down" />}
          onOpen={this.handleOpen}
        >
          <Dropdown
            open={true}
            icon={false}
            className={styles.dropdown}
            style={this.state.styles}
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
                icon="trash alternate outline"
                text="Delete..."
                name="delete"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Portal>
      </div>
    );
  }
}

PlateTab.propTypes = {
  plate: PropTypes.object.isRequired,
  plateIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onCloneMenuItemClick: PropTypes.func,
  onDeleteMenuItemClick: PropTypes.func,
};
