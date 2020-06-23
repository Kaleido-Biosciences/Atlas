import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { GridTab } from './GridTab';
import { AddContainerButton } from '../AddContainerButton';
import { CloneForm } from './CloneForm';
import { DeleteGridConfirmation } from './DeleteGridConfirmation';
import styles from './GridTabs.module.css';

export class GridTabs extends Component {
  state = {
    cloneModalOpen: false,
    deleteModalOpen: false,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.tabs.length < this.props.tabs.length) {
      this.scrollbars.scrollLeft(this.scrollbars.getScrollWidth());
    }
  }
  setScrollbarsRef = (ref) => {
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
  handleCloneSubmit = (typesToClone, quantity) => {
    if (this.props.onClone) {
      this.props.onClone(this.props.activeGridId, typesToClone, quantity);
    }
    this.closeCloneModal();
  };
  handleDeleteSubmit = () => {
    if (this.props.onDelete) {
      this.props.onDelete({ gridId: this.props.activeGridId });
    }
    this.closeDeleteModal();
  };
  renderTabs() {
    const { tabs, onTabClick } = this.props;
    if (tabs && tabs.length) {
      return tabs.map((tab, i) => {
        return (
          <GridTab
            key={tab.id}
            gridId={tab.id}
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
    const {
      componentTypes,
      onAddPlates,
      onAddRack,
      onAddContainer,
      containerTypeOptions,
    } = this.props;
    return (
      <div className={styles.gridTabs}>
        <AddContainerButton
          className={styles.addContainerButton}
          onAddPlates={onAddPlates}
          onAddRack={onAddRack}
          onAddContainer={onAddContainer}
          containerTypeOptions={containerTypeOptions}
        />
        <div className={styles.scrollContainer}>
          <Scrollbars
            ref={this.setScrollbarsRef}
            style={{ height: '100%', width: '100%' }}
          >
            <div className={styles.tabContainer}>{this.renderTabs()}</div>
          </Scrollbars>
        </div>
        <Modal
          size="mini"
          open={cloneModalOpen}
          onClose={this.closeCloneModal}
          closeIcon
        >
          <Header icon="clone outline" content="Clone Plate" />
          <Modal.Content>
            <CloneForm
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
            <DeleteGridConfirmation onConfirmClick={this.handleDeleteSubmit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

GridTabs.propTypes = {
  tabs: PropTypes.array,
  activeGridId: PropTypes.string,
  onTabClick: PropTypes.func,
  onAddPlates: PropTypes.func,
  onAddRack: PropTypes.func,
  onAddContainer: PropTypes.func,
  onClone: PropTypes.func,
  componentTypes: PropTypes.array,
  onDelete: PropTypes.func,
  containerTypeOptions: PropTypes.array,
};
