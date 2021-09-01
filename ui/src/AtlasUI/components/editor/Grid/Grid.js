import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { ColumnHeaders } from './ColumnHeaders';
import { ColumnHeader } from './ColumnHeader';
import { RowHeaders } from './RowHeaders';
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
            values={grid.columnHeaders}
          />
          {/* <ColumnHeader
            containerSize={this.props.settings.containerSize}
            headerSize={this.props.headerSize}
            numberOfColumns={this.props.grid.data[0].length}
            onClick={this.handleHeaderCellClick}
            ref={this.columnHeaderRef}
          /> */}
        </div>
        <div className={styles.body}>
          <RowHeaders
            cellHeight={settings.containerSize.size}
            cellWidth={this.props.headerSize}
            cellXPadding={0}
            cellYPadding={settings.containerSize.outerPadding}
            values={grid.rowHeaders}
          />
          <GridData
            containerTypeOptions={this.props.containerTypeOptions}
            enableRemoveComponent={this.props.enableRemoveComponent}
            grid={this.props.grid}
            settings={this.props.settings}
            onAddContainer={this.handleAddContainer}
            onContainerClick={this.handleContainerClick}
            onRemoveComponent={this.props.onRemoveComponent}
          />
          {/* <RowHeader
            containerSize={this.props.settings.containerSize}
            headerSize={this.props.headerSize}
            numberOfRows={this.props.grid.data.length}
            onClick={this.handleHeaderCellClick}
            ref={this.rowHeaderRef}
            rowHeaders={this.props.rowHeaders}
          />
          <Scrollbars
            onScrollFrame={this.handleScroll}
            renderTrackHorizontal={this.renderTrackHorizontal}
            renderTrackVertical={this.renderTrackVertical}
            style={{ height: '100%', width: '100%' }}
          >
            <GridData
              containerTypeOptions={this.props.containerTypeOptions}
              enableRemoveComponent={this.props.enableRemoveComponent}
              grid={this.props.grid}
              settings={this.props.settings}
              onAddContainer={this.handleAddContainer}
              onContainerClick={this.handleContainerClick}
              onRemoveComponent={this.props.onRemoveComponent}
            />
          </Scrollbars> */}
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
