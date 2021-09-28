import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Well } from './Well';
import { getPlateRows } from 'AtlasUI/utils/plate';
import styles from './PlateGrid.module.css';

export class Wells extends Component {
  handleWellClick = (well) => {
    if (this.props.onWellClick) {
      this.props.onWellClick(well);
    }
  };
  render() {
    const { plate } = this.props;
    const rows = getPlateRows(plate);
    const renderedGrid = rows.map((row, i) => {
      const rowKey = `ROW_${i}`;
      const wells = row.map((well, i) => {
        const selected = this.props.selectedWells.includes(well.name);
        return (
          <Well
            height={this.props.wellHeight}
            key={well.name}
            marginBottom={this.props.wellMarginBottom}
            marginRight={this.props.wellMarginRight}
            selected={selected}
            well={well}
            width={this.props.wellWidth}
          />
        );
        //   const positionKey = `${grid.id}_POSITION_${position.row}${position.column}`;
        //   return (
        //     <GridPosition
        //       containerSelected={selected}
        //       enableRemoveComponent={this.props.enableRemoveComponent}
        //       height={settings.containerSize.size}
        //       innerPadding={settings.containerSize.innerPadding}
        //       key={positionKey}
        //       onAddContainerClick={this.handleAddContainerClick}
        //       onContainerClick={this.handleContainerClick}
        //       onRemoveComponent={this.props.onRemoveComponent}
        //       outerPadding={settings.containerSize.outerPadding}
        //       position={position}
        //       width={settings.containerSize.size}
        //     />
        //   );
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
  onWellClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  plate: PropTypes.object.isRequired,
  selectedWells: PropTypes.array.isRequired,
  wellHeight: PropTypes.number,
  wellMarginBottom: PropTypes.number,
  wellMarginRight: PropTypes.number,
  wellWidth: PropTypes.number,
};
