import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import { Settings } from './Settings';
import { ColumnHeader } from './ColumnHeader';
import { RowHeader } from './RowHeader';
import { Grid } from './Grid';
import styles from './ContainerGrid.module.css';

export class ContainerGrid extends Component {
  columnHeaderRef = React.createRef();
  rowHeaderRef = React.createRef();
  handleScroll = values => {
    this.columnHeaderRef.current.setScrollPos(values.scrollLeft);
    this.rowHeaderRef.current.setScrollPos(values.scrollTop);
  };
  handleAddContainer = options => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer(options);
    }
  };
  handleContainerClick = ({ position }) => {
    if (this.props.onContainerClick) {
      this.props.onContainerClick({ position });
    }
  };
  render() {
    const { containerGrid, settings, onSettingsChange } = this.props;
    return (
      <div className={styles.containerGrid}>
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
        <div className={styles.body}>
          <RowHeader
            ref={this.rowHeaderRef}
            numberOfRows={containerGrid.grid.length}
            containerSize={settings.containerSize}
          />
          <Scrollbars
            style={{ height: '100%', width: '100%' }}
            onScrollFrame={this.handleScroll}
          >
            <Grid
              containerGrid={containerGrid}
              settings={settings}
              onAddContainer={this.handleAddContainer}
              onContainerClick={this.handleContainerClick}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

ContainerGrid.propTypes = {
  containerGrid: PropTypes.object,
  settings: PropTypes.object,
  onSettingsChange: PropTypes.func,
  onAddContainer: PropTypes.func,
  onContainerClick: PropTypes.func,
};
