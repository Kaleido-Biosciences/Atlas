import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

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
    if (this.props.onClick) {
      this.props.onClick({
        containerId: this.props.containerGrid.id,
        positions: [position],
      });
    }
  };
  handleHeaderCellClick = ({ cellType, index }) => {
    if (this.props.onClick) {
      const grid = this.props.containerGrid.grid;
      let positions;
      if (cellType === 'column') {
        positions = grid.map(row => {
          return row[index];
        });
      } else if (cellType === 'row') {
        positions = grid[index];
      }
      this.props.onClick({
        containerId: this.props.containerGrid.id,
        positions,
      });
    }
  };
  render() {
    const { containerGrid, settings } = this.props;
    return (
      <div className={styles.containerGrid}>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell}></div>
          <ColumnHeader
            ref={this.columnHeaderRef}
            numberOfColumns={containerGrid.grid[0].length}
            containerSize={settings.containerSize}
            onClick={this.handleHeaderCellClick}
          />
        </div>
        <div className={styles.body}>
          <RowHeader
            ref={this.rowHeaderRef}
            numberOfRows={containerGrid.grid.length}
            containerSize={settings.containerSize}
            onClick={this.handleHeaderCellClick}
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
  onAddContainer: PropTypes.func,
  onClick: PropTypes.func,
};
