import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PlateToolbar } from '../../components/PlateToolbar/PlateToolbar';
import { Plate } from '../../components/Plate/Plate';
import { ComponentToolbar } from '../../components/ComponentToolbar/ComponentToolbar';
import { NoPlatesMessage } from '../../components/Plate/NoPlatesMessage';
import { Panel } from '../../components/Panel/Panel';
import { AddComponentsPanel } from '../../components/AddComponentsPanel/AddComponentsPanel';
import SplitPane from 'react-split-pane';
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
      <div className={styles.buildStep}>
        {showPlate && (
          <React.Fragment>
            <PlateToolbar onComplete={this.props.onComplete} />
            <div className={styles.plateContainer}>
              {/* <Panel containerClass={styles.componentToolbar}>
                  <ComponentToolbar onTabChange={this.handleClickModeChange} />
                </Panel>
                <Panel
                  containerClass={styles.addComponentsPanel}
                  defaultSize={{ width: 'auto', height: '250px' }}
                >
                  <AddComponentsPanel />
                </Panel> */}
              <SplitPane
                primary="second"
                defaultSize={300}
                minSize={200}
                pane1Style={{ overflow: 'hidden' }}
              >
                <Plate
                  plate={activePlate}
                  onWellsClick={this.handlePlateClick}
                />
                <ComponentToolbar onTabChange={this.handleClickModeChange} />
              </SplitPane>
            </div>
          </React.Fragment>
        )}
        {!showPlate && <NoPlatesMessage onAddClick={this.props.addNewPlate} />}
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
