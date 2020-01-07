import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';

import { PlateTabBar } from '../../editor/PlateTabBar';
import { Plate } from '../../editor/Plate';
import { PlateSidebar } from '../../editor/PlateSidebar';
import { NoPlatesMessage } from '../../editor/Plate/NoPlatesMessage';
import styles from './Editor.module.css';

export class Editor extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.location.search);
    }
  }

  render() {
    const { plates, activePlate, onAddClick } = this.props;
    const showPlate = plates.length > 0 && activePlate;
    return (
      <div className={styles.buildStep}>
        {showPlate && (
          <React.Fragment>
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
        {!showPlate && <NoPlatesMessage onAddClick={onAddClick} />}
      </div>
    );
  }
}

Editor.propTypes = {
  location: PropTypes.object,
  plates: PropTypes.array,
  activePlate: PropTypes.object,
  onMount: PropTypes.func,
  onAddClick: PropTypes.func,
};
