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
    return (
      <div ref={this.divRef} className={styles.columnHeaders}>
        {this.props.values.map((value, i) => {
          return (
            <HeaderCell
              height={this.props.cellHeight}
              index={i}
              key={i}
              label={value}
              marginRight={this.props.cellMarginRight}
              onClick={this.handleCellClick}
              width={this.props.cellWidth}
            />
          );
        })}
      </div>
    );
  }
}

ColumnHeaders.propTypes = {
  cellHeight: PropTypes.number,
  cellMarginRight: PropTypes.number,
  cellWidth: PropTypes.number,
  onClick: PropTypes.func,
  values: PropTypes.array.isRequired,
};

ColumnHeaders.defaultProps = {
  cellHeight: 24,
  cellMarginRight: 4,
  cellWidth: 120,
};
