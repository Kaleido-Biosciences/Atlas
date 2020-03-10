import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GridPosition } from './GridPosition';
import styles from './ContainerGrid.module.css';

export class Grid extends Component {
  handleWellClick = ({ well }) => {
    if (this.props.onWellClick) {
      this.props.onWellClick({
        wellIds: [well.id],
      });
    }
  };
  // renderWells() {
  //   const { plate, settings } = this.props;
  //   const { wells: plateWells } = plate;
  //   return plateWells.map((row, i) => {
  //     const rowKey = `${plate.id}ROW${i}`;
  //     const wells = row.map(well => {
  //       const wellKey = `${plate.id}WELL${well.id}`;
  //       return (
  //         <Well
  //           well={well}
  //           settings={settings}
  //           onClick={this.handleWellClick}
  //           key={wellKey}
  //         />
  //       );
  //     });
  //     return (
  //       <div key={rowKey} className={styles.row}>
  //         {wells}
  //       </div>
  //     );
  //   });
  // }
  render() {
    const { containerGrid, settings } = this.props;
    const { grid } = containerGrid;
    const id = containerGrid.id;
    const renderedGrid = grid.map((row, i) => {
      const rowKey = `${id}_ROW_${i}`;
      const positions = row.map((position, i) => {
        const positionKey = `${id}_POSITION_${position.row}${position.column}`;
        return <GridPosition key={positionKey} settings={settings} />;
      });
      return (
        <div key={rowKey} className={styles.row}>
          {positions}
        </div>
      );
    });
    return <div>{renderedGrid}</div>;
  }
}

Grid.propTypes = {
  containerGrid: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onWellClick: PropTypes.func,
};
