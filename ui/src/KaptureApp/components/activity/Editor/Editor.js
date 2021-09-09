import React, { Component } from 'react';
import { Grid } from 'AtlasUI/components';
import { GridHeader } from '../GridHeader';
import styles from './Editor.module.css';

export class Editor extends Component {
  render() {
    const grid = this.props.view.data.grids[0];
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
