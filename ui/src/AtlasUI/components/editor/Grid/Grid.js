import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import { ColumnHeader } from './ColumnHeader';
import { RowHeader } from './RowHeader';
import { GridData } from './GridData';
import styles from './Grid.module.css';

export class Grid extends Component {
  columnHeaderRef = React.createRef();
  rowHeaderRef = React.createRef();
  handleScroll = (values) => {
    this.columnHeaderRef.current.setScrollPos(values.scrollLeft);
    this.rowHeaderRef.current.setScrollPos(values.scrollTop);
  };
  handleAddContainer = (options) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer(options);
    }
  };
  handleContainerClick = ({ position }) => {
    if (this.props.onClick) {
      this.props.onClick(this.props.grid.id, [position]);
    }
  };
  handleHeaderCellClick = ({ cellType, index }) => {
    if (this.props.onClick) {
      const gridData = this.props.grid.data;
      let positions;
      if (cellType === 'column') {
        positions = gridData.map((row) => {
          return row[index];
        });
      } else if (cellType === 'row') {
        positions = gridData[index];
      }
      this.props.onClick(this.props.grid.id, positions);
    }
  };
  render() {
    const {
      grid,
      settings,
      containerTypeOptions,
      headerSize,
      rowHeaders,
    } = this.props;
    const cornerStyle = { height: headerSize + 'px', width: headerSize + 'px' };
    return (
      <div className={styles.grid}>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell} style={cornerStyle}></div>
          <ColumnHeader
            ref={this.columnHeaderRef}
            numberOfColumns={grid.data[0].length}
            containerSize={settings.containerSize}
            onClick={this.handleHeaderCellClick}
            headerSize={headerSize}
          />
        </div>
        <div className={styles.body}>
          <RowHeader
            ref={this.rowHeaderRef}
            numberOfRows={grid.data.length}
            containerSize={settings.containerSize}
            onClick={this.handleHeaderCellClick}
            headerSize={headerSize}
            rowHeaders={rowHeaders}
          />
          <Scrollbars
            style={{ height: '100%', width: '100%' }}
            onScrollFrame={this.handleScroll}
          >
            <GridData
              grid={grid}
              settings={settings}
              onContainerClick={this.handleContainerClick}
              containerTypeOptions={containerTypeOptions}
              onAddContainer={this.handleAddContainer}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  grid: PropTypes.object,
  settings: PropTypes.object,
  onClick: PropTypes.func,
  containerTypeOptions: PropTypes.array,
  onAddContainer: PropTypes.func,
  headerSize: PropTypes.number.isRequired,
  rowHeaders: PropTypes.array.isRequired,
};
