import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'AtlasUI/components';
import { GridHeader } from '../GridHeader';
import styles from './Editor.module.css';

export class Editor extends Component {
  render() {
    const grid = this.props.view.data.viewGrids[0].grid;
    return (
      <div className={styles.editor}>
        <GridHeader grid={grid} />
        <div className={styles.gridContainer}>
          <Grid
            containerTypeOptions={this.props.containerTypeOptions}
            grid={grid}
            settings={this.props.settings}
            onClick={this.props.onContainerClick}
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
