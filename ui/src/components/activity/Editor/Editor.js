import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SplitPane from 'react-split-pane';

import { importContainerCollection } from '../../../store/activitiesActions';
import { initializePlates } from '../../../store/designActions';
import { selectActivePlate } from '../../../store/selectors';
import { PlateTabBar } from '../../editor/PlateTabBar';
import { Plate } from '../../editor/Plate';
import { PlateSidebar } from '../../editor/PlateSidebar';
import { NoPlatesMessage } from '../../editor/Plate/NoPlatesMessage';
import styles from './Editor.module.css';

class Editor extends Component {
  async componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    await this.props.importContainerCollection(params.status, params.version);
    this.props.initializePlates();
  }

  render() {
    const { plates, activePlate, onComplete, addNewPlate } = this.props;
    const showPlate = plates.length > 0 && activePlate;
    return (
      <div className={styles.buildStep}>
        {showPlate && (
          <React.Fragment>
            {/* <ExperimentHeader onComplete={onComplete} /> */}
            <div className={styles.container}>
              <SplitPane
                primary="second"
                defaultSize={300}
                minSize={200}
                pane1Style={{ overflow: 'hidden' }}
                pane2Style={{ height: '100%' }}
              >
                <div className={styles.mainContainer}>
                  <div className={styles.plateTabContainer}>
                    <PlateTabBar />
                  </div>
                  <div className={styles.plateContainer}>
                    <Plate />
                  </div>
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

Editor.propTypes = {
  importContainerCollection: PropTypes.func,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { plates, clickMode } = state.designExperiment;
  return { activePlate, plates, clickMode };
};

const mapDispatch = {
  importContainerCollection,
  initializePlates,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
