import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import {
  createExperimentActions,
  addNewPlateMap,
  clonePlateMap,
} from '../../store/createExperiment';
import { selectActivePlateMap } from '../../store/selectors';
import { PlateMapDropdown } from './PlateMapDropdown';
import { DeletePlateMapButton } from './DeletePlateMapButton/DeletePlateMapButton';
import { ClonePlateMapButton } from './ClonePlateMapButton/ClonePlateMapButton';
import { MarkAsCompletedButton } from './MarkAsCompletedButton/MarkAsCompletedButton';
import styles from './PlateMapToolbar.module.css';

class PlateMapToolbar extends Component {
  handleAdd = () => {
    if (this.props.onAdd) {
      this.props.onAdd();
    }
  };
  handleDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.activePlateMap.id);
    }
  };
  handleClone = ({ typesToClone }) => {
    if (this.props.onClone) {
      this.props.onClone(this.props.activePlateMap.id, typesToClone);
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
    const { plateMaps, activePlateMap } = this.props;
    return (
      <div className={styles.toolbar}>
        <div className={styles.dropdownContainer}>
          <PlateMapDropdown
            plateMaps={plateMaps}
            activePlateMap={activePlateMap}
            onChange={this.props.onPlateMapChange}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            icon="plus circle"
            content="Add plate"
            onClick={this.handleAdd}
          />
          <DeletePlateMapButton onConfirm={this.handleDelete} />
          <ClonePlateMapButton onSubmit={this.handleClone} />
          <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
        </div>
      </div>
    );
  }
}

PlateMapToolbar.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object.isRequired,
  onPlateMapChange: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  onClone: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const { plateMaps } = state.createExperiment;
  const activePlateMap = selectActivePlateMap(state);
  return { plateMaps, activePlateMap };
};

const mapDispatch = {
  onPlateMapChange: createExperimentActions.setActivePlateMap,
  onDelete: createExperimentActions.deletePlateMap,
  onAdd: addNewPlateMap,
  onClone: clonePlateMap,
  onMarkAsCompleted: createExperimentActions.setCompletedStatus,
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateMapToolbar);
export { connected as PlateMapToolbar };
