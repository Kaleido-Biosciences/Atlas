import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.module.css';
import classNames from 'classnames';

export class Grid extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.grid.id);
    }
  };
  render() {
    const className = classNames(
      styles.grid,
      'border',
      'border-gray-300',
      'p-1',
      'text-xs'
    );
    return (
      <div className={className} onClick={this.handleClick}>
        {this.props.grid.name}
      </div>
    );
  }
}

Grid.propTypes = {
  grid: PropTypes.object,
  onClick: PropTypes.func,
};
