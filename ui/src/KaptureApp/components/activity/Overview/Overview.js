import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Overview extends Component {
  handleAddPlate = () => {
    if (this.props.onAddPlate) {
      this.props.onAddPlate({ rows: 8, columns: 12 }, 1);
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
        <div>{this.renderGrids()}</div>
      </div>
    );
  }
}

Overview.propTypes = {
  grids: PropTypes.array.isRequired,
  onAddPlate: PropTypes.func,
};
