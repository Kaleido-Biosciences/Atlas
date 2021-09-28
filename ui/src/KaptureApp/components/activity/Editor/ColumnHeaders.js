import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderCell } from './HeaderCell';
import styles from './PlateGrid.module.css';

export class ColumnHeaders extends Component {
  divRef = React.createRef();
  setScrollPos = (scrollPos) => {
    this.divRef.current.scrollLeft = scrollPos;
  };
  handleCellClick = (index) => {
    if (this.props.onClick) {
      this.props.onClick('column', index);
    }
  };
  render() {
    const cells = this.props.values.map((value, i) => {
      return (
        <HeaderCell
          height={this.props.cellHeight}
          index={i}
          key={i}
          label={value}
          onClick={this.handleCellClick}
          width={this.props.cellWidth}
          xPadding={this.props.cellXPadding}
          yPadding={this.props.cellYPadding}
        />
      );
    });
    return (
      <div ref={this.divRef} className={styles.columnHeaders}>
        {cells}
      </div>
    );
  }
}

ColumnHeaders.propTypes = {
  cellHeight: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellXPadding: PropTypes.number.isRequired,
  cellYPadding: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  values: PropTypes.array.isRequired,
};

ColumnHeaders.defaultProps = {
  cellHeight: 24,
  cellWidth: 120,
  cellXPadding: 2,
  cellYPadding: 0,
};
