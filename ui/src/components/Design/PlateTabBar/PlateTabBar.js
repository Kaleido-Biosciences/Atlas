import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Modal, Header } from 'semantic-ui-react';

import {
  addNewPlate,
  setActivePlate,
  clonePlate,
} from '../../../store/experimentActions';
import { selectActivePlate } from '../../../store/selectors';
import { PlateTab } from './PlateTab';
import styles from './PlateTabBar.module.css';
import { ClonePlateForm } from './ClonePlateForm';

class PlateTabBar extends Component {
  state = {
    cloneModalOpen: false,
  };
  openCloneModal = () => {
    this.setState({ cloneModalOpen: true });
  };
  closeCloneModal = () => {
    this.setState({ cloneModalOpen: false });
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
  renderTabs() {
    const { plates, onTabClick } = this.props;
    if (plates && plates.length) {
      return plates.map((plate, i) => {
        return (
          <PlateTab
            plate={plate}
            onClick={onTabClick}
            onCloneMenuItemClick={this.openCloneModal}
          />
        );
      });
    }
  }
  render() {
    const { cloneModalOpen } = this.state;
    return (
      <div className={styles.plateTabBar}>
        <div className={styles.addIcon} onClick={this.handleAddClick}>
          <Icon name="plus circle" link title="Add Plate" />
        </div>
        {this.renderTabs()}
        <Modal size="mini" open={cloneModalOpen} onClose={this.closeCloneModal}>
          <Header icon="clone outline" content="Clone Plate" />
          <Modal.Content>
            <ClonePlateForm onSubmit={this.handleCloneSubmit} />
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
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateTabBar);
export { connected as PlateTabBar };
