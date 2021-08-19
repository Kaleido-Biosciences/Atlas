import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Overview extends Component {
  handleAddPlate = () => {
    if (this.props.onAddPlate) {
      this.props.onAddPlate({ rows: 8, columns: 12 }, 1);
    }
  };
  handleAddMultiTableView = () => {
    if (this.props.onAddView) {
      this.props.onAddView({
        type: 'MultiPlateTable',
        data: {
          gridIds: this.props.grids.map((grid) => grid.id),
        },
      });
    }
  };
  renderGrids() {
    return this.props.grids.map((grid) => {
      return <div key={grid.id}>{grid.name}</div>;
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleAddPlate}>Add Plate</button>
        <button onClick={this.handleAddMultiTableView}>
          Add multi table view
        </button>
        <div>{this.renderGrids()}</div>
      </div>
    );
  }
}

Overview.propTypes = {
  grids: PropTypes.array.isRequired,
  onAddPlate: PropTypes.func,
  onAddView: PropTypes.func,
};
