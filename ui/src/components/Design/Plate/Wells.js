import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Well } from './Well';
import styles from './Plate.module.css';

export class Wells extends Component {
  renderWells() {
    const { wells } = this.props.plate;
    const { wellSize } = this.props;
    return wells.map(row => {
      let wells = row.map(well => {
        return <Well well={well} wellSize={wellSize} />;
      });
      return <div className={styles.row}>{wells}</div>;
    });
  }
  render() {
    return <div>{this.renderWells()}</div>;
  }
}

Wells.propTypes = {
  plate: PropTypes.object.isRequired,
  wellSize: PropTypes.object.isRequired,
};
