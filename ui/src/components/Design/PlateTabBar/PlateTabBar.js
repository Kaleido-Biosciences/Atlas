import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Modal, Header } from 'semantic-ui-react';

import {
  addNewPlate,
  setActivePlate,
  clonePlate,
  deletePlate,
} from '../../../store/experimentActions';
import { selectActivePlate } from '../../../store/selectors';
import { PlateTab } from './PlateTab';
import styles from './PlateTabBar.module.css';
import { ClonePlateForm } from './ClonePlateForm';
import { DeletePlateConfirmation } from './DeletePlateConfirmation';

class PlateTabBar extends Component {
  state = {
    cloneModalOpen: false,
    deleteModalOpen: false,
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
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
    }
  };
  handleCloneSubmit = ({ typesToClone }) => {
    if (this.props.onClone) {
      this.props.onClone(this.props.activePlate.id, typesToClone);
      this.closeCloneModal();
    }
  };
  handleDeleteSubmit = () => {
    if (this.props.onDelete) {
      this.props.onDelete({ plateId: this.props.activePlate.id });
      this.closeDeleteModal();
    }
  };
  renderTabs() {
    const { plates, onTabClick } = this.props;
    if (plates && plates.length) {
      return plates.map((plate, i) => {
        return (
          <PlateTab
            key={plate.id}
            plate={plate}
            plateIndex={i}
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
    return (
      <div className={styles.plateTabBar}>
        <div className={styles.addIcon} onClick={this.handleAddClick}>
          <Icon name="plus circle" link title="Add Plate" size="large" />
        </div>
        {this.renderTabs()}
        <Modal size="mini" open={cloneModalOpen} onClose={this.closeCloneModal}>
          <Header icon="clone outline" content="Clone Plate" />
          <Modal.Content>
            <ClonePlateForm onSubmit={this.handleCloneSubmit} />
          </Modal.Content>
        </Modal>
        <Modal
          size="mini"
          open={deleteModalOpen}
          onClose={this.closeDeleteModal}
        >
          <Header icon="trash alternate outline" content="Delete Plate" />
          <Modal.Content>
            <DeletePlateConfirmation onConfirmClick={this.handleDeleteSubmit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

PlateTabBar.propTypes = {
  plates: PropTypes.array,
  activePlate: PropTypes.object,
  onAddClick: PropTypes.func,
  onTabClick: PropTypes.func,
  onClone: PropTypes.func,
  onDelete: PropTypes.func,
};

const mapState = (state, props) => {
  const { plates } = state.designExperiment;
  const activePlate = selectActivePlate(state);
  return { plates, activePlate };
};

const mapDispatch = {
  onAddClick: addNewPlate,
  onTabClick: setActivePlate,
  onClone: clonePlate,
  onDelete: deletePlate,
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateTabBar);
export { connected as PlateTabBar };
