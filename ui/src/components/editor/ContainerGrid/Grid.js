import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GridPosition } from './GridPosition';
import { AddContainerModal } from '../AddContainerButton';
import styles from './ContainerGrid.module.css';

export class Grid extends Component {
  state = {
    addContainerPosition: null,
    addContainerModalOpen: false,
  };
  handleAddContainerClick = ({ position }) => {
    this.setState({
      addContainerPosition: position,
      addContainerModalOpen: true,
    });
  };
  handleAddContainer = ({ container }) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer({
        containerGridId: this.props.containerGrid.id,
        position: this.state.addContainerPosition,
        type: container.type,
      });
    }
    this.setState({
      addContainerPosition: null,
      addContainerModalOpen: false,
    });
  };
  render() {
    const { containerGrid, settings } = this.props;
    const { grid } = containerGrid;
    const id = containerGrid.id;
    const renderedGrid = grid.map((row, i) => {
      const rowKey = `${id}_ROW_${i}`;
      const positions = row.map((position, i) => {
        const positionKey = `${id}_POSITION_${position.row}${position.column}`;
        return (
          <GridPosition
            key={positionKey}
            settings={settings}
            position={position}
            onAddContainerClick={this.handleAddContainerClick}
          />
        );
      });
      return (
        <div key={rowKey} className={styles.row}>
          {positions}
        </div>
      );
    });
    return (
      <div>
        {renderedGrid}
        <AddContainerModal
          open={this.state.addContainerModalOpen}
          onAddClick={this.handleAddContainer}
        />
      </div>
    );
  }
}

Grid.propTypes = {
  containerGrid: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onAddContainer: PropTypes.func,
};
