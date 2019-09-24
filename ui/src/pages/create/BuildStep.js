import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';

import {
  addNewPlate,
  toggleWellsSelected,
  applySelectedToolComponentsToWells,
  clearWells,
} from '../../store/experimentActions';
import { selectActivePlate } from '../../store/selectors';
import { ExperimentHeader } from '../../components/Design/ExperimentHeader';
import { PlateToolbar } from '../../components/PlateToolbar/PlateToolbar';
import { PlateSidebar } from '../../components/PlateSidebar';
import { Plate } from '../../components/Plate/Plate';
import { PlateTabBar } from '../../components/Design/PlateTabBar';
import { NoPlatesMessage } from '../../components/Plate/NoPlatesMessage';
import styles from './BuildStep.module.css';

class BuildStep extends Component {
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
    const { plates, activePlate, onComplete, addNewPlate } = this.props;
    const showPlate = plates.length > 0 && activePlate;
    return (
      <div className={styles.buildStep}>
        {showPlate && (
          <React.Fragment>
            {/* <PlateToolbar onComplete={onComplete} /> */}
            <ExperimentHeader onComplete={onComplete} />
            <div className={styles.container}>
              <SplitPane
                primary="second"
                defaultSize={300}
                minSize={200}
                pane1Style={{ overflow: 'hidden' }}
                pane2Style={{ height: '100%' }}
              >
                <div className={styles.plateContainer}>
                  <Plate
                    plate={activePlate}
                    onWellsClick={this.handlePlateClick}
                  />
                  <PlateTabBar />
                </div>
                <PlateSidebar />
              </SplitPane>
            </div>
          </React.Fragment>
        )}
        {!showPlate && <NoPlatesMessage onAddClick={addNewPlate} />}
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
  applySelectedToolComponentsToWells,
  clearWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(BuildStep);
export { connected as BuildStep };
