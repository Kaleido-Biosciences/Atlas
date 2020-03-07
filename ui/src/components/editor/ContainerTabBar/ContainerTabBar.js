import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import { ContainerTab } from './ContainerTab';
import { AddContainerButton } from '../AddContainer';
import styles from './ContainerTabBar.module.css';

export class ContainerTabBar extends Component {
  renderTabs() {
    const { tabs, onTabClick } = this.props;
    if (tabs && tabs.length) {
      return tabs.map((tab, i) => {
        return (
          <ContainerTab
            key={tab.id}
            containerId={tab.id}
            name={tab.name}
            active={tab.active}
            onClick={onTabClick}
          />
        );
      });
    }
  }
  render() {
    const { onAddContainer, onAddContainerGrid } = this.props;
    return (
      <div className={styles.containerTabBar}>
        <AddContainerButton
          className={styles.addContainerButton}
          onAddContainer={onAddContainer}
          onAddContainerGrid={onAddContainerGrid}
        />
        <div className={styles.scrollContainer}>
          <Scrollbars
            ref={this.setScrollbarsRef}
            style={{ height: '100%', width: '100%' }}
          >
            <div className={styles.tabContainer}>{this.renderTabs()}</div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

ContainerTabBar.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  onClone: PropTypes.func,
  onDelete: PropTypes.func,
  onAddContainer: PropTypes.func,
  onAddContainerGrid: PropTypes.func,
};
