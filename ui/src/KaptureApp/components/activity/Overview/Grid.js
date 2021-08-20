import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Grid extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.grid.id);
    }
  };
  render() {
    return <div onClick={this.handleClick}>{this.props.grid.name}</div>;
  }
}

Grid.propTypes = {
  grid: PropTypes.object,
  onClick: PropTypes.func,
};
