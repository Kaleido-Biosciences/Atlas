import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Draggable from 'react-draggable';

import { PlateToolbar } from '../../components/PlateToolbar/PlateToolbar';
import { Plate } from '../../components/Plate/Plate';
import { ComponentToolbar } from '../../components/ComponentToolbar/ComponentToolbar';
import { NoPlatesMessage } from '../../components/Plate/NoPlatesMessage';
import styles from './BuildStep.module.css';

import {
  addNewPlate,
  toggleWellsSelected,
  setClickMode,
  deselectAllWells,
  applySelectedComponentsToWells,
  clearWells,
} from '../../store/experimentActions';
import { selectActivePlate } from '../../store/selectors';

class BuildStep extends Component {
  handleClickModeChange = clickMode => {
    this.props.setClickMode(clickMode);
    this.props.deselectAllWells({ plateId: this.props.activePlate.id });
  };
  handlePlateClick = data => {
    const { clickMode } = this.props;
    if (clickMode === 'apply') {
      this.props.applySelectedComponentsToWells(data);
    }
    if (clickMode === 'clear') {
      this.props.clearWells(data);
    }
    if (clickMode === 'select') {
      this.props.toggleWellsSelected(data);
    }
  };
  render() {
    const { plates, activePlate } = this.props;
    const showPlate = plates.length > 0 && activePlate;
    return (
      <div className={styles.container}>
        <div className={styles.plate}>
          {showPlate && (
            <React.Fragment>
              <PlateToolbar onComplete={this.props.onComplete} />
              <div className={styles.plateContainer}>
                <Draggable
                  handle={`.${styles.dragHandle}`}
                  position={null}
                  scale={1}
                >
                  <div className={styles.componentToolbar}>
                    <Segment>
                      <div className={styles.dragHandle} />
                      <ComponentToolbar
                        onTabChange={this.handleClickModeChange}
                      />
                    </Segment>
                  </div>
                </Draggable>
                <Plate
                  plate={activePlate}
                  onWellsClick={this.handlePlateClick}
                />
              </div>
            </React.Fragment>
          )}
          {!showPlate && (
            <NoPlatesMessage onAddClick={this.props.addNewPlate} />
          )}
        </div>
      </div>
    );
  }
}

BuildStep.propTypes = {
  plates: PropTypes.array.isRequired,
  activePlate: PropTypes.object,
  clickMode: PropTypes.string.isRequired,
  addNewPlate: PropTypes.func.isRequired,
  toggleWellsSelected: PropTypes.func.isRequired,
  setClickMode: PropTypes.func.isRequired,
  deselectAllWells: PropTypes.func.isRequired,
  applySelectedComponentsToWells: PropTypes.func.isRequired,
  clearWells: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { plates, clickMode } = state.designExperiment;
  return { activePlate, plates, clickMode };
};

const mapDispatch = {
  addNewPlate,
  toggleWellsSelected,
  setClickMode,
  deselectAllWells,
  applySelectedComponentsToWells,
  clearWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(BuildStep);
export { connected as BuildStep };
