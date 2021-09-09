import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class GridHeader extends Component {
  render() {
    return (
      <div className="h-10 bg-gray-50 pl-4 flex flex-row items-center border-b border-gray-100 text-sm">
        {this.props.grid.name}
      </div>
    );
  }
}

GridHeader.propTypes = {
  grid: PropTypes.object,
};
