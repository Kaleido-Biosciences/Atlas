import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HeaderCell } from './HeaderCell';
import styles from './PlateGrid.module.css';

export class RowHeader extends Component {
  divRef = React.createRef();
  setScrollPos = (scrollPos) => {
    this.divRef.current.scrollTop = scrollPos;
  };
  handleCellClick = ({ index }) => {
    if (this.props.onClick) {
      this.props.onClick({ cellType: 'row', index });
    }
  };
  render() {
    const { numberOfRows, containerSize, headerSize, rowHeaders } = this.props;
    const style = {
      height: containerSize.size + 'px',
      width: headerSize + 'px',
      padding: `${containerSize.outerPadding}px 0`,
    };
    const cells = [];
    for (let i = 0; i < numberOfRows; i++) {
      cells.push(
        <HeaderCell
          key={rowHeaders[i]}
          index={i}
          label={rowHeaders[i]}
          style={style}
          onClick={this.handleCellClick}
        />
      );
    }
    return (
      <div ref={this.divRef} className={styles.rowHeader}>
        {cells}
      </div>
    );
  }
}

RowHeader.propTypes = {
  numberOfRows: PropTypes.number,
  containerSize: PropTypes.object.isRequired,
  headerSize: PropTypes.number.isRequired,
  rowHeaders: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
