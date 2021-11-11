import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColumnHeaders } from './ColumnHeaders';
import { RowHeaders } from './RowHeaders';
import { Wells } from './Wells';
import styles from './PlateGrid.module.css';
import { Scrollbars } from 'KaptureApp/components';
import { getPlateRows } from 'models';

export class PlateGrid extends Component {
  columnHeadersRef = React.createRef();
  rowHeadersRef = React.createRef();
  handleScroll = (values) => {
    this.columnHeadersRef.current.setScrollPos(values.scrollLeft);
    this.rowHeadersRef.current.setScrollPos(values.scrollTop);
  };
  handleWellClick = (wellId) => {
    if (this.props.onClick) {
      this.props.onClick([wellId], [this.props.plate.id]);
    }
  };
  handleHeaderCellClick = (cellType, index) => {
    if (this.props.onClick) {
      const { plate } = this.props;
      const rows = getPlateRows(plate);
      let wells;
      if (cellType === 'column') {
        wells = rows.map((row) => {
          return row[index].id;
        });
      } else if (cellType === 'row') {
        wells = rows[index].map((well) => well.id);
      }
      this.props.onClick(wells, [this.props.plate.id]);
    }
  };
  handleRemoveComponent = (wellId, componentId) => {
    if (this.props.onRemoveComponent) {
      this.props.onRemoveComponent(this.props.plate.id, wellId, componentId);
    }
  };
  render() {
    const { plate } = this.props;
    const { settings } = this.props;
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
              enableRemoveComponent={this.props.enableRemoveComponent}
              onRemoveComponent={this.handleRemoveComponent}
              onWellClick={this.handleWellClick}
              plate={plate}
              wellHeight={settings.wellHeight}
              wellMarginBottom={settings.wellMarginBottom}
              wellMarginRight={settings.wellMarginRight}
              wellPadding={settings.wellPadding}
              wellWidth={settings.wellWidth}
              componentSettings={settings.component}
            />
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
  settings: PropTypes.object,
};
