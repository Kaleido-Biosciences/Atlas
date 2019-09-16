import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PlateToolbar } from '../../components/PlateToolbar/PlateToolbar';
import { PlateSidebar } from '../../components/PlateSidebar';
import { Plate } from '../../components/Plate/Plate';
import { ComponentToolbar } from '../../components/ComponentToolbar/ComponentToolbar';
import { NoPlatesMessage } from '../../components/Plate/NoPlatesMessage';
import { Panel } from '../../components/Panel/Panel';
import SplitPane from 'react-split-pane';
import styles from './BuildStep.module.css';

import {
  addNewPlate,
  toggleWellsSelected,
  setClickMode,
  deselectAllWells,
  applySelectedToolComponentsToWells,
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
      this.props.applySelectedToolComponentsToWells(data);
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
                <PlateSidebar />
              </SplitPane>
              <Panel containerClass={styles.componentToolbar}>
                <ComponentToolbar onTabChange={this.handleClickModeChange} />
              </Panel>
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
  applySelectedToolComponentsToWells: PropTypes.func.isRequired,
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
  applySelectedToolComponentsToWells,
  clearWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(BuildStep);
export { connected as BuildStep };
