import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Well } from './Well';
import { getPlateRows } from 'models';
import styles from './PlateGrid.module.css';

export class Wells extends Component {
  render() {
    const { plate } = this.props;
    const rows = getPlateRows(plate);
    const renderedGrid = rows.map((row, i) => {
      const rowKey = `ROW_${i}`;
      const wells = row.map((well, i) => {
        const selected = this.props.selectedWells.includes(well.id);
        return (
          <Well
            enableRemoveComponent={this.props.enableRemoveComponent}
            height={this.props.wellHeight}
            key={well.id}
            marginBottom={this.props.wellMarginBottom}
            marginRight={this.props.wellMarginRight}
            onClick={this.props.onWellClick}
            onRemoveComponent={this.props.onRemoveComponent}
            padding={this.props.wellPadding}
            selected={selected}
            well={well}
            width={this.props.wellWidth}
          />
        );
      });
      return (
        <div key={rowKey} className={styles.row}>
          {wells}
        </div>
      );
    });
    return <div>{renderedGrid}</div>;
  }
}

Wells.propTypes = {
  enableRemoveComponent: PropTypes.bool,
  onRemoveComponent: PropTypes.func,
  onWellClick: PropTypes.func,
  plate: PropTypes.object.isRequired,
  selectedWells: PropTypes.array.isRequired,
  wellHeight: PropTypes.number,
  wellMarginBottom: PropTypes.number,
  wellMarginRight: PropTypes.number,
  wellPadding: PropTypes.number,
  wellWidth: PropTypes.number,
};
