import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

import { Header } from './Header';
import { ApplyTool } from './ApplyTool';
import { EraserTool } from './EraserTool';
import styles from './Tools.module.css';

export class Tools extends Component {
  handleToolClick = (e, { name }) => {
    if (this.props.onToolMenuItemClick) {
      this.props.onToolMenuItemClick({ clickMode: name });
    }
  };
  renderTool() {
    const { clickMode } = this.props;
    if (clickMode === 'apply' || clickMode === 'select') {
      return <ApplyTool />;
    } else if (clickMode === 'clear') {
      return <EraserTool />;
    }
  }
  render() {
    const { clickMode } = this.props;
    return (
      <div className={styles.tools}>
        <Header />
        <Menu size="mini" className={styles.menu}>
          <Menu.Item
            name="apply"
            onClick={this.handleToolClick}
            active={clickMode === 'apply'}
            title="Apply tool"
          >
            <Icon name="paint brush" />
          </Menu.Item>

          <Menu.Item
            name="select"
            onClick={this.handleToolClick}
            active={clickMode === 'select'}
            title="Select tool"
          >
            <Icon name="expand" />
          </Menu.Item>

          <Menu.Item
            name="clear"
            onClick={this.handleToolClick}
            active={clickMode === 'clear'}
            title="Clear tool"
          >
            <Icon name="eraser" />
          </Menu.Item>
        </Menu>
        {this.renderTool()}
      </div>
    );
  }
}

Tools.propTypes = {
  clickMode: PropTypes.string.isRequired,
  onToolMenuItemClick: PropTypes.func,
};
