import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ContainerTab } from './ContainerTab';
import { AddContainerButton } from '../AddContainerButton';
import { CloneContainerForm } from './CloneContainerForm';
import { DeleteContainerConfirmation } from './DeleteContainerConfirmation';
import styles from './ContainerTabBar.module.css';

export class ContainerTabBar extends Component {
  state = {
    cloneModalOpen: false,
    deleteModalOpen: false,
    containerAdded: false,
  };
  componentDidUpdate() {
    if (this.state.containerAdded) {
      this.scrollbars.scrollLeft(this.scrollbars.getScrollWidth());
      this.setState({ containerAdded: false });
    }
  }
  setScrollbarsRef = ref => {
    this.scrollbars = ref;
  };
  openCloneModal = () => {
    this.setState({ cloneModalOpen: true });
  };
  closeCloneModal = () => {
    this.setState({ cloneModalOpen: false });
  };
  openDeleteModal = () => {
    this.setState({ deleteModalOpen: true });
  };
  closeDeleteModal = () => {
    this.setState({ deleteModalOpen: false });
  };
  handleCloneSubmit = ({ typesToClone }) => {
    if (this.props.onClone) {
      this.props.onClone({
        containerId: this.props.activeContainerId,
        componentTypesToClone: typesToClone,
      });
    }
    this.closeCloneModal();
  };
  handleDeleteSubmit = () => {
    if (this.props.onDelete) {
      this.props.onDelete({ containerId: this.props.activeContainerId });
    }
    this.closeDeleteModal();
  };
  handleAddContainer = ({ container }) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer({ container });
      this.setState({ containerAdded: true });
    }
  };
  handleAddContainerGrid = ({ containerGrid }) => {
    if (this.props.onAddContainerGrid) {
      this.props.onAddContainerGrid({ containerGrid });
      this.setState({ containerAdded: true });
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
            onDeleteMenuItemClick={this.openDeleteModal}
          />
        );
      });
    }
  }
  render() {
    const { cloneModalOpen, deleteModalOpen } = this.state;
    const { componentTypes } = this.props;
    return (
      <div className={styles.containerTabBar}>
        <AddContainerButton
          className={styles.addContainerButton}
          onAddContainer={this.handleAddContainer}
          onAddContainerGrid={this.handleAddContainerGrid}
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
        <Modal
          size="mini"
          open={deleteModalOpen}
          onClose={this.closeDeleteModal}
        >
          <Header icon="trash alternate outline" content="Delete Container" />
          <Modal.Content>
            <DeleteContainerConfirmation
              onConfirmClick={this.handleDeleteSubmit}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ContainerTabBar.propTypes = {
  tabs: PropTypes.array,
  activeContainerId: PropTypes.string,
  componentTypes: PropTypes.array,
  onTabClick: PropTypes.func,
  onClone: PropTypes.func,
  onDelete: PropTypes.func,
  onAddContainer: PropTypes.func,
  onAddContainerGrid: PropTypes.func,
};
