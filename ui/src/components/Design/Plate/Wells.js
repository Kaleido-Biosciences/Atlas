import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Well } from './Well';
import styles from './Plate.module.css';

export class Wells extends Component {
  handleWellClick = ({ well }) => {
    if (this.props.onWellClick) {
      this.props.onWellClick({
        wellIds: [well.id],
      });
    }
  };
  renderWells() {
    const { plate, settings } = this.props;
    const { wells: plateWells } = plate;
    return plateWells.map(row => {
      const wells = row.map(well => {
        return (
          <Well
            well={well}
            settings={settings}
            onClick={this.handleWellClick}
          />
        );
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
  settings: PropTypes.object.isRequired,
  onWellClick: PropTypes.func,
};
