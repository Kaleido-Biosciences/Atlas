import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'AtlasUI/components';
import { GridHeader } from '../GridHeader';
import styles from './Editor.module.css';

export class Editor extends Component {
  render() {
    const viewGrid = this.props.view.data.viewGrids[0];
    return (
      <div className={styles.editor}>
        <GridHeader grid={viewGrid.grid} />
        <div className={styles.gridContainer}>
          <Grid
            containerTypeOptions={this.props.containerTypeOptions}
            grid={viewGrid.grid}
            onClick={this.props.onContainerClick}
            selectedContainers={viewGrid.selectedContainers}
            settings={this.props.settings}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  containerTypeOptions: PropTypes.array,
  onContainerClick: PropTypes.func,
  settings: PropTypes.object,
  view: PropTypes.object,
};
