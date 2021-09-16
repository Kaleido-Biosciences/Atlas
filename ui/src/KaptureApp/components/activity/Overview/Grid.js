import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.module.css';
import classNames from 'classnames';
import { EditableText } from '../../EditableText';
import { getGridRows } from 'AtlasUI/utils/grid';

export class Grid extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.grid.id);
    }
  };
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.grid.id, value);
    }
  };
  handleCheckboxClick = (e) => {
    if (this.props.onCheckboxClick) {
      this.props.onCheckboxClick(this.props.grid.id);
    }
  };
  renderGrid() {
    const rows = getGridRows(this.props.grid);
    const renderedRows = rows.map((row, i) => {
      const positions = row.map((position) => {
        return (
          <div
            className={classNames(styles.container, 'border-gray-400', {
              'bg-gray-400': position.container.components.length > 0,
            })}
            key={position.name}
          ></div>
        );
      });
      return (
        <div className={styles.row} key={`ROW${i}`}>
          {positions}
        </div>
      );
    });
    return <div>{renderedRows}</div>;
  }
  render() {
    const className = classNames(
      styles.grid,
      'border',
      'border-gray-300',
      'text-xs',
      'cursor-pointer'
    );
    return (
      <div className={className} onClick={this.handleClick}>
        <div className={styles.header}>
          <div>
            <input
              name="selected"
              checked={this.props.selected}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
              onClick={this.handleCheckboxClick}
              type="checkbox"
            />
          </div>
          <div className="text-xxs font-bold">
            <EditableText
              onSave={this.handleSaveName}
              value={this.props.grid.name}
            />
          </div>
        </div>
        <div className={styles.gridContainer}>{this.renderGrid()}</div>
      </div>
    );
  }
}

Grid.propTypes = {
  grid: PropTypes.object,
  onClick: PropTypes.func,
  onSaveName: PropTypes.func,
  onCheckboxClick: PropTypes.func,
  selected: PropTypes.bool,
};
