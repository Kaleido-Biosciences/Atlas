import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderCell } from './HeaderCell';
import styles from './Grid.module.css';

export class RowHeaders extends Component {
  divRef = React.createRef();
  setScrollPos = (scrollPos) => {
    this.divRef.current.scrollTop = scrollPos;
  };
  handleCellClick = (index) => {
    if (this.props.onClick) {
      this.props.onClick('row', index);
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
      <div ref={this.divRef} className={styles.rowHeader}>
        {cells}
      </div>
    );
  }
}

RowHeaders.propTypes = {
  cellHeight: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellXPadding: PropTypes.number.isRequired,
  cellYPadding: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  values: PropTypes.array.isRequired,
};

RowHeaders.defaultProps = {
  cellHeight: 120,
  cellWidth: 24,
  cellXPadding: 0,
  cellYPadding: 2,
};
