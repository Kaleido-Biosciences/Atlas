import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Settings } from './Settings';
import { ColumnHeader } from './ColumnHeader';
import styles from './ContainerGrid.module.css';

export class ContainerGrid extends Component {
  render() {
    const { containerGrid, settings, onSettingsChange } = this.props;
    return (
      <div>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell}>
            <Settings settings={settings} onChange={onSettingsChange} />
          </div>
          <ColumnHeader
            ref={this.columnHeaderRef}
            numberOfColumns={containerGrid.grid[0].length}
            containerSize={settings.containerSize}
          />
        </div>
      </div>
    );
  }
}

ContainerGrid.propTypes = {
  containerGrid: PropTypes.object,
  settings: PropTypes.object,
  onSettingsChange: PropTypes.func,
};
