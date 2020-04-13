import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GridPosition } from './GridPosition';
import { AddContainerModal } from '../AddContainerButton';
import styles from './Grid.module.css';

export class GridData extends Component {
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
  handleAddContainerModalClose = () => {
    this.setState({ addContainerModalOpen: false });
  };
  handleAddContainer = ({ containerType }) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer({
        gridId: this.props.grid.id,
        position: this.state.addContainerPosition,
        containerType,
      });
    }
    this.setState({
      addContainerPosition: null,
      addContainerModalOpen: false,
    });
  };
  handleContainerClick = ({ position }) => {
    if (this.props.onContainerClick) {
      this.props.onContainerClick({ position });
    }
  };
  render() {
    const { grid, settings, containerTypeOptions } = this.props;
    const { data } = grid;
    const id = grid.id;
    const renderedGrid = data.map((row, i) => {
      const rowKey = `${id}_ROW_${i}`;
      const positions = row.map((position, i) => {
        const positionKey = `${id}_POSITION_${position.row}${position.column}`;
        return (
          <GridPosition
            key={positionKey}
            height={settings.containerSize.size}
            width={settings.containerSize.size}
            innerPadding={settings.containerSize.innerPadding}
            outerPadding={settings.containerSize.outerPadding}
            position={position}
            onAddContainerClick={this.handleAddContainerClick}
            onContainerClick={this.handleContainerClick}
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
          onClose={this.handleAddContainerModalClose}
          containerTypeOptions={containerTypeOptions}
          onAddClick={this.handleAddContainer}
        />
      </div>
    );
  }
}

GridData.propTypes = {
  grid: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onContainerClick: PropTypes.func,
  containerTypeOptions: PropTypes.array,
  onAddContainer: PropTypes.func,
};
