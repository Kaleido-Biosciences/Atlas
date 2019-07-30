import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Draggable from 'react-draggable';

import { PlateMapToolbar } from '../../components/PlateMapToolbar';
import { PlateMap } from '../../components/PlateMap';
import { ComponentToolbar } from '../../components/ComponentToolbar/ComponentToolbar';
import { NoPlateMapsMessage } from '../../components/NoPlateMapsMessage';
import styles from './BuildStep.module.css';
import { saveExperimentPlateMaps } from '../../api';

import {
  createExperimentActions,
  addNewPlateMap,
  selectActivePlateMap,
} from '../../store/createExperiment';

class BuildStep extends Component {
  handleClickModeChange = clickMode => {
    this.props.setClickMode(clickMode);
    this.props.clearSelectedWells({ plateMapId: this.props.activePlateMap.id });
  };
  handlePlateMapClick = data => {
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
    const { plateMaps, activePlateMap } = this.props;
    const showPlateMap = plateMaps.length > 0 && activePlateMap;
    return (
      <div className={styles.container}>
        <div className={styles.plateMap}>
          {showPlateMap && (
            <React.Fragment>
              <PlateMapToolbar onComplete={this.props.onComplete} />
              <div className={styles.plateMapContainer}>
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
                <PlateMap
                  plateMap={activePlateMap}
                  onWellsClick={this.handlePlateMapClick}
                />
              </div>
            </React.Fragment>
          )}
          {!showPlateMap && (
            <NoPlateMapsMessage onAddClick={this.props.addNewPlateMap} />
          )}
        </div>
      </div>
    );
  }
}

BuildStep.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object,
  clickMode: PropTypes.string.isRequired,
  addNewPlateMap: PropTypes.func.isRequired,
  toggleWellsSelected: PropTypes.func.isRequired,
  setClickMode: PropTypes.func.isRequired,
  clearSelectedWells: PropTypes.func.isRequired,
  applySelectedComponentsToWells: PropTypes.func.isRequired,
  clearWells: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const activePlateMap = selectActivePlateMap(state);
  const { plateMaps, clickMode, experiment, status } = state.createExperiment;
  if ( plateMaps && plateMaps.length > 0 ) {
    saveExperimentPlateMaps(experiment.name, status, plateMaps);
  }
  return { activePlateMap, plateMaps, clickMode };
};

const mapDispatch = {
  addNewPlateMap,
  toggleWellsSelected: createExperimentActions.toggleWellsSelected,
  setClickMode: createExperimentActions.setClickMode,
  clearSelectedWells: createExperimentActions.clearSelectedWells,
  applySelectedComponentsToWells:
    createExperimentActions.applySelectedComponentsToWells,
  clearWells: createExperimentActions.clearWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(BuildStep);
export { connected as BuildStep };
