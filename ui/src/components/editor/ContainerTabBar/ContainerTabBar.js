import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Header } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ContainerTab } from './ContainerTab';
import { AddContainerButton } from '../AddContainerButton';
import { CloneContainerForm } from './CloneContainerForm';
import styles from './ContainerTabBar.module.css';

export class ContainerTabBar extends Component {
  state = {
    cloneModalOpen: false,
  };
  openCloneModal = () => {
    this.setState({ cloneModalOpen: true });
  };
  closeCloneModal = () => {
    this.setState({ cloneModalOpen: false });
  };
  handleCloneSubmit = ({ typesToClone }) => {
    console.log(typesToClone);
    if (this.props.onClone) {
      //this.props.onClone(this.props.activePlate.id, typesToClone);
      this.closeCloneModal();
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
            onCloneMenuItemClick={this.openCloneModal}
          />
        );
      });
    }
  }
  render() {
    const { cloneModalOpen } = this.state;
    const { componentTypes, onAddContainer, onAddContainerGrid } = this.props;
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
        <Modal size="mini" open={cloneModalOpen} onClose={this.closeCloneModal}>
          <Header icon="clone outline" content="Clone Plate" />
          <Modal.Content>
            <CloneContainerForm
              onSubmit={this.handleCloneSubmit}
              componentTypes={componentTypes}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ContainerTabBar.propTypes = {
  tabs: PropTypes.array,
  componentTypes: PropTypes.object,
  onTabClick: PropTypes.func,
  onClone: PropTypes.func,
  onDelete: PropTypes.func,
  onAddContainer: PropTypes.func,
  onAddContainerGrid: PropTypes.func,
};
