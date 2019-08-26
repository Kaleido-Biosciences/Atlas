import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import {
  setActivePlate,
  addNewPlate,
  deletePlate,
  clonePlate,
  setCompletedStatus,
} from '../../store/experimentActions';
import { selectActivePlate } from '../../store/selectors';
import { PlateDropdown } from './PlateDropdown';
import { DeletePlateButton } from './DeletePlateButton/DeletePlateButton';
import { ClonePlateButton } from './ClonePlateButton/ClonePlateButton';
import { MarkAsCompletedButton } from './MarkAsCompletedButton/MarkAsCompletedButton';
import styles from './PlateToolbar.module.css';

class PlateToolbar extends Component {
  handleAdd = () => {
    if (this.props.onAdd) {
      this.props.onAdd();
    }
  };
  handleDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.activePlate.id);
    }
  };
  handleClone = ({ typesToClone }) => {
    if (this.props.onClone) {
      this.props.onClone(this.props.activePlate.id, typesToClone);
    }
  };
  handleMarkAsCompleted = () => {
    if (this.props.onMarkAsCompleted) {
      this.props.onMarkAsCompleted();
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  };
  render() {
    const { plates, activePlate } = this.props;
    return (
      <div className={styles.toolbar}>
        <div className={styles.dropdownContainer}>
          <PlateDropdown
            plates={plates}
            activePlate={activePlate}
            onChange={this.props.onPlateChange}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            icon="plus circle"
            content="Add plate"
            onClick={this.handleAdd}
          />
          <DeletePlateButton onConfirm={this.handleDelete} />
          <ClonePlateButton onSubmit={this.handleClone} />
          <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
        </div>
      </div>
    );
  }
}

PlateToolbar.propTypes = {
  plates: PropTypes.array.isRequired,
  activePlate: PropTypes.object.isRequired,
  onPlateChange: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onClone: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const { plates } = state.designExperiment;
  const activePlate = selectActivePlate(state);
  return { plates, activePlate };
};

const mapDispatch = {
  onPlateChange: setActivePlate,
  onAdd: addNewPlate,
  onDelete: deletePlate,
  onClone: clonePlate,
  onMarkAsCompleted: setCompletedStatus,
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateToolbar);
export { connected as PlateToolbar };
