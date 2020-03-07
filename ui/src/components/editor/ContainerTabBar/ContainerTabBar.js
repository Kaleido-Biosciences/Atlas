import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ContainerTab } from './ContainerTab';
import { AddContainerModal } from '../AddContainer';
import { AddContainerButton } from '../AddContainer';
import styles from './ContainerTabBar.module.css';

export class ContainerTabBar extends Component {
  state = {
    addContainerModalOpen: false,
  };
  openAddContainerModal = () => {
    this.setState({ addContainerModalOpen: true });
  };
  closeAddContainerModal = () => {
    this.setState({ addContainerModalOpen: false });
  };
  handleAddContainer = ({ container }) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer({ container });
    }
  };
  handleAddContainerGrid = ({ containerGrid }) => {
    if (this.props.onAddContainerGrid) {
      this.props.onAddContainerGrid({ containerGrid });
    }
  };
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
    const { addContainerModalOpen } = this.state;
    const { onAddContainer, onAddContainerGrid } = this.props;
    return (
      <div className={styles.containerTabBar}>
        <AddContainerButton
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
        <AddContainerModal
          open={addContainerModalOpen}
          onClose={this.closeAddContainerModal}
          onSubmitContainer={this.handleAddContainer}
          onSubmitContainerGrid={this.handleAddContainerGrid}
        />
      </div>
    );
  }
}

ContainerTabBar.propTypes = {
  tabs: PropTypes.array,
  containers: PropTypes.array,
  activeContainer: PropTypes.object,
  onAddClick: PropTypes.func,
  onTabClick: PropTypes.func,
  onClone: PropTypes.func,
  onDelete: PropTypes.func,
  onAddContainer: PropTypes.func,
  onAddContainerGrid: PropTypes.func,
};
