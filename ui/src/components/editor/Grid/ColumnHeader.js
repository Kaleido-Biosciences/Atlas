import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HeaderCell } from './HeaderCell';
import styles from './Grid.module.css';

export class ColumnHeader extends Component {
  divRef = React.createRef();
  setScrollPos = (scrollPos) => {
    this.divRef.current.scrollLeft = scrollPos;
  };
  handleCellClick = ({ index }) => {
    if (this.props.onClick) {
      this.props.onClick({ cellType: 'column', index });
    }
  };
  render() {
    const { numberOfColumns, containerSize, headerSize } = this.props;
    const style = {
      height: headerSize + 'px',
      width: containerSize.size + 'px',
      padding: `0 ${containerSize.outerPadding}px`,
    };
    const cells = [];
    for (let i = 0; i < numberOfColumns; i++) {
      cells.push(
        <HeaderCell
          key={i}
          index={i}
          label={i + 1}
          style={style}
          onClick={this.handleCellClick}
        />
      );
    }
    return (
      <div ref={this.divRef} className={styles.columnHeader}>
        {cells}
      </div>
    );
  }
}

ColumnHeader.propTypes = {
  numberOfColumns: PropTypes.number,
  containerSize: PropTypes.object.isRequired,
  headerSize: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};
