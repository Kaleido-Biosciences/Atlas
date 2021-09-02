import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColumnHeaders } from './ColumnHeaders';
import { RowHeaders } from './RowHeaders';
import { GridData } from './GridData';
import styles from './Grid.module.css';
import { Scrollbars } from '../../Scrollbars';

export class Grid extends Component {
  columnHeadersRef = React.createRef();
  rowHeadersRef = React.createRef();
  handleScroll = (values) => {
    this.columnHeadersRef.current.setScrollPos(values.scrollLeft);
    this.rowHeadersRef.current.setScrollPos(values.scrollTop);
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
  // handleHeaderCellClick = (cellType, index) => {
  //   if (this.props.onClick) {
  //     const gridData = this.props.grid.data;
  //     let positions;
  //     if (cellType === 'column') {
  //       positions = gridData.map((row) => {
  //         return row[index];
  //       });
  //     } else if (cellType === 'row') {
  //       positions = gridData[index];
  //     }
  //     this.props.onClick(this.props.grid.id, positions);
  //   }
  // };
  handleHeaderCellClick = (cellType, index) => {
    if (this.props.onClick) {
      const { grid } = this.props;
      const rows = [];
      for (let i = 0; i < grid.dimensions.rows; i++) {
        const start = i * grid.dimensions.columns;
        const end = (i + 1) * grid.dimensions.columns;
        const row = grid.data.slice(start, end);
        rows.push(row);
      }
      let positions = [];
      if (cellType === 'column') {
        positions = rows.map((row) => {
          return row[index];
        });
      } else if (cellType === 'row') {
        positions = rows[index];
      }
      this.props.onClick(grid.id, positions);
    }
  };
  renderTrackHorizontal({ style, ...props }) {
    return (
      <div
        className={styles.horizontalTrack}
        style={{ ...style, height: '10px' }}
        {...props}
      />
    );
  }
  renderTrackVertical({ style, ...props }) {
    return (
      <div
        className={styles.verticalTrack}
        style={{ ...style, width: '10px' }}
        {...props}
      />
    );
  }
  render() {
    const { grid, settings } = this.props;
    const cornerStyle = {
      height: this.props.headerSize + 'px',
      width: this.props.headerSize + 'px',
    };
    return (
      <div className={styles.grid}>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell} style={cornerStyle}></div>
          <ColumnHeaders
            cellHeight={this.props.headerSize}
            cellWidth={settings.containerSize.size}
            cellXPadding={settings.containerSize.outerPadding}
            cellYPadding={0}
            onClick={this.handleHeaderCellClick}
            ref={this.columnHeadersRef}
            values={grid.columnHeaders}
          />
        </div>
        <div className={styles.body}>
          <RowHeaders
            cellHeight={settings.containerSize.size}
            cellWidth={this.props.headerSize}
            cellXPadding={0}
            cellYPadding={settings.containerSize.outerPadding}
            onClick={this.handleHeaderCellClick}
            ref={this.rowHeadersRef}
            values={grid.rowHeaders}
          />
          <Scrollbars onScrollFrame={this.handleScroll}>
            <GridData
              containerTypeOptions={this.props.containerTypeOptions}
              enableRemoveComponent={this.props.enableRemoveComponent}
              grid={this.props.grid}
              settings={this.props.settings}
              onAddContainer={this.handleAddContainer}
              onContainerClick={this.handleContainerClick}
              onRemoveComponent={this.props.onRemoveComponent}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  containerTypeOptions: PropTypes.array,
  enableRemoveComponent: PropTypes.bool,
  grid: PropTypes.object,
  headerSize: PropTypes.number,
  onAddContainer: PropTypes.func,
  onClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  settings: PropTypes.object,
};

Grid.defaultProps = {
  headerSize: 24,
};
