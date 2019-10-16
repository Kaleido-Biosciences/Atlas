import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HeaderCell } from './HeaderCell';
import styles from './Plate.module.css';

export class ColumnHeader extends Component {
  divRef = React.createRef();
  setScrollPos = scrollPos => {
    this.divRef.current.scrollLeft = scrollPos;
  };
  render() {
    const { plate } = this.props;
    const firstRow = plate.wells[0];
    const cells = firstRow.map((column, i) => {
      return (
        <HeaderCell
          key={i}
          headerType="column"
          index={i}
          label={i + 1}
          className={styles.columnHeaderCell}
        />
      );
    });
    return (
      <div ref={this.divRef} className={styles.columnHeader}>
        {cells}
      </div>
    );
  }
}

ColumnHeader.propTypes = {
  plate: PropTypes.object.isRequired,
};
