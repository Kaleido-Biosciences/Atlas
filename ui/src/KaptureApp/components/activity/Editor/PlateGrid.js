import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColumnHeaders } from './ColumnHeaders';
import { RowHeaders } from './RowHeaders';
import { Wells } from './Wells';
import styles from './PlateGrid.module.css';
import { Scrollbars } from 'AtlasUI/components';
import { getPlateRows } from 'AtlasUI/utils/plate';

export class PlateGrid extends Component {
  columnHeadersRef = React.createRef();
  rowHeadersRef = React.createRef();
  handleScroll = (values) => {
    this.columnHeadersRef.current.setScrollPos(values.scrollLeft);
    this.rowHeadersRef.current.setScrollPos(values.scrollTop);
  };
  handleContainerClick = ({ position }) => {
    if (this.props.onClick) {
      this.props.onClick(this.props.grid.id, [position]);
    }
  };
  handleHeaderCellClick = (cellType, index) => {
    if (this.props.onClick) {
      const { grid } = this.props;
      const rows = getPlateRows(grid);
      let positions;
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
    const { plate } = this.props;
    const settings = {
      columnHeaderHeight: 24,
      rowHeaderWidth: 24,
      cellSpacing: 5,
      headerMargin: 5,
      wellHeight: 120,
      wellWidth: 120,
    };
    const cornerStyle = {
      height: settings.columnHeaderHeight + 'px',
      width: settings.rowHeaderWidth + 'px',
    };
    return (
      <div className={styles.plateGrid}>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell} style={cornerStyle}></div>
          <ColumnHeaders
            onClick={this.handleHeaderCellClick}
            ref={this.columnHeadersRef}
            values={plate.columnHeaders}
          />
        </div>
        <div className={styles.body}>
          <RowHeaders
            onClick={this.handleHeaderCellClick}
            ref={this.rowHeadersRef}
            values={plate.rowHeaders}
          />
          <Scrollbars onScrollFrame={this.handleScroll}>
            <Wells plate={plate} selectedWells={this.props.selectedWells} />
            {/* <GridData
              containerTypeOptions={this.props.containerTypeOptions}
              enableRemoveComponent={this.props.enableRemoveComponent}
              grid={this.props.grid}
              settings={this.props.settings}
              onAddContainer={this.handleAddContainer}
              onContainerClick={this.handleContainerClick}
              onRemoveComponent={this.props.onRemoveComponent}
              selectedContainers={this.props.selectedContainers}
            /> */}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

PlateGrid.propTypes = {
  enableRemoveComponent: PropTypes.bool,
  onClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  plate: PropTypes.object,
  selectedWells: PropTypes.array,
};
