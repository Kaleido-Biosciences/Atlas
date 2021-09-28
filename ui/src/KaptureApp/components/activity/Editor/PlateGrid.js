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
    const wellHeight = 120;
    const wellWidth = 120;
    const wellMarginRight = 4;
    const wellMarginBottom = 4;
    const headerMargin = 4;
    const headerSize = 24;
    const settings = {
      columnHeaderCellHeight: headerSize,
      columnHeaderCellWidth: wellWidth,
      columnHeaderCellMarginRight: wellMarginRight,
      columnHeaderBottomMargin: headerMargin,
      rowHeaderCellHeight: wellHeight,
      rowHeaderCellWidth: headerSize,
      rowHeaderCellMarginBottom: wellMarginBottom,
      rowHeaderRightMargin: headerMargin,
      wellHeight,
      wellWidth,
      wellMarginRight,
      wellMarginBottom,
    };
    const cornerStyle = {
      height: settings.columnHeaderCellHeight + 'px',
      width: settings.rowHeaderCellWidth + 'px',
      marginRight: settings.rowHeaderRightMargin + 'px',
    };
    const topHeaderStyle = {
      marginBottom: `${settings.columnHeaderBottomMargin}px`,
    };
    const rowHeaderStyle = {
      marginRight: `${settings.rowHeaderRightMargin}px`,
    };
    return (
      <div className={styles.plateGrid}>
        <div className={styles.topHeader} style={topHeaderStyle}>
          <div className={styles.cornerCell} style={cornerStyle}></div>
          <ColumnHeaders
            cellHeight={settings.columnHeaderCellHeight}
            cellMarginRight={settings.columnHeaderCellMarginRight}
            cellWidth={settings.columnHeaderCellWidth}
            onClick={this.handleHeaderCellClick}
            ref={this.columnHeadersRef}
            values={plate.columnHeaders}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.rowHeader} style={rowHeaderStyle}>
            <RowHeaders
              cellHeight={settings.rowHeaderCellHeight}
              cellMarginBottom={settings.rowHeaderCellMarginBottom}
              cellWidth={settings.rowHeaderCellWidth}
              onClick={this.handleHeaderCellClick}
              ref={this.rowHeadersRef}
              values={plate.rowHeaders}
            />
          </div>
          <Scrollbars onScrollFrame={this.handleScroll}>
            <Wells
              plate={plate}
              selectedWells={this.props.selectedWells}
              wellHeight={settings.wellHeight}
              wellMarginBottom={settings.wellMarginBottom}
              wellMarginRight={settings.wellMarginRight}
              wellWidth={settings.wellWidth}
            />
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
