import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderCell } from './HeaderCell';
import styles from './PlateGrid.module.css';

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
    return (
      <div ref={this.divRef} className="h-full overflow-hidden">
        {this.props.values.map((value, i) => {
          return (
            <HeaderCell
              height={this.props.cellHeight}
              index={i}
              key={i}
              label={value}
              marginBottom={this.props.cellMarginBottom}
              onClick={this.handleCellClick}
              width={this.props.cellWidth}
            />
          );
        })}
      </div>
    );
  }
}

RowHeaders.propTypes = {
  cellHeight: PropTypes.number,
  cellMarginBottom: PropTypes.number,
  cellWidth: PropTypes.number,
  onClick: PropTypes.func,
  values: PropTypes.array.isRequired,
};

RowHeaders.defaultProps = {
  cellHeight: 120,
  cellMarginBottom: 4,
  cellWidth: 24,
};
