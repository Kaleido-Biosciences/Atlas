import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown, Portal, Icon } from 'semantic-ui-react';

import styles from './ContainerTabBar.module.css';

export class ContainerTab extends Component {
  state = {
    styles: {},
  };
  handleClick = () => {
    const { containerId } = this.props;
    if (this.props.onClick) {
      this.props.onClick({ id: containerId });
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
    const { name, active } = this.props;
    const tabClass = classNames(styles.containerTab, {
      [styles.active]: active,
    });
    return (
      <div className={tabClass} onClick={this.handleClick}>
        <span>{name}</span>
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

ContainerTab.propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
  containerId: PropTypes.string,
  onClick: PropTypes.func,
  onCloneMenuItemClick: PropTypes.func,
  onDeleteMenuItemClick: PropTypes.func,
};
