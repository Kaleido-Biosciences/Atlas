import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridHeader } from '../GridHeader';
import { Scrollbars } from 'AtlasUI/components';
import { Position } from './Position';
import styles from './PlateTable.module.css';

export class PlateTable extends Component {
  handlePositionClick = (position) => {
    if (this.props.onContainerClick) {
      this.props.onContainerClick(this.props.view.data.viewGrids[0].id, [
        position,
      ]);
    }
  };
  renderPlate() {
    const viewGrid = this.props.view.data.viewGrids[0];
    const { grid: plate, selectedContainers } = viewGrid;
    return plate.positions.map((position, i) => {
      const selected = selectedContainers.includes(position.name);
      return (
        <Position
          position={position}
          selected={selected}
          index={i}
          key={position.name}
          onClick={this.handlePositionClick}
        />
      );
    });
  }
  render() {
    const grid = this.props.view.data.viewGrids[0].grid;
    return (
      <div className={styles.plateTable}>
        <GridHeader grid={grid} />
        <div className={styles.scrollContainer}>
          <Scrollbars>
            <table className="h-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Well
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Components
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderPlate()}</tbody>
            </table>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

PlateTable.propTypes = {
  view: PropTypes.object.isRequired,
  onContainerClick: PropTypes.func,
};
