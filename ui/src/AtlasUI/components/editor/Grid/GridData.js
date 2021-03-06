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
            enableRemoveComponent={this.props.enableRemoveComponent}
            height={settings.containerSize.size}
            innerPadding={settings.containerSize.innerPadding}
            key={positionKey}
            onAddContainerClick={this.handleAddContainerClick}
            onContainerClick={this.handleContainerClick}
            onRemoveComponent={this.props.onRemoveComponent}
            outerPadding={settings.containerSize.outerPadding}
            position={position}
            width={settings.containerSize.size}
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
  containerTypeOptions: PropTypes.array,
  enableRemoveComponent: PropTypes.bool,
  grid: PropTypes.object.isRequired,
  onAddContainer: PropTypes.func,
  onContainerClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  settings: PropTypes.object.isRequired,
};
