import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.module.css';
import classNames from 'classnames';
import { EditableText } from '../../EditableText';
import { getGridRows } from 'AtlasUI/utils/grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Grid extends Component {
  handleEditorClick = () => {
    if (this.props.onEditorClick) {
      this.props.onEditorClick(this.props.viewGrid.id);
    }
  };
  handleTableClick = () => {
    if (this.props.onTableClick) {
      this.props.onTableClick(this.props.viewGrid.id);
    }
  };
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.viewGrid.id, value);
    }
  };
  handleCheckboxChange = (e) => {
    if (this.props.onCheckboxChange) {
      this.props.onCheckboxChange(this.props.viewGrid.id);
    }
  };
  renderGrid() {
    const rows = getGridRows(this.props.viewGrid.grid);
    const selections = this.props.viewGrid.selectedContainers;
    let className;
    const renderedRows = rows.map((row, i) => {
      const positions = row.map((position) => {
        if (selections.includes(position.name)) {
          className = classNames(
            styles.container,
            'bg-blue-200',
            'border-blue-200'
          );
        } else {
          className = classNames(styles.container, {
            'border-gray-400': position.container.components.length > 0,
            'bg-gray-400': position.container.components.length > 0,
            'border-gray-200': position.container.components.length === 0,
            'bg-gray-200': position.container.components.length === 0,
          });
        }
        return <div className={className} key={position.name}></div>;
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
    const { viewGrid } = this.props;
    const className = classNames(
      styles.grid,
      'bg-white',
      'shadow',
      'rounded-lg',
      'text-xs',
      'cursor-pointer'
    );
    return (
      <div className={className}>
        <div className={styles.header}>
          <div>
            <input
              name="selected"
              checked={viewGrid.selected}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
              onChange={this.handleCheckboxChange}
              type="checkbox"
            />
          </div>
          <div className="text-xs font-medium">
            <EditableText
              onSave={this.handleSaveName}
              value={viewGrid.grid.name}
            />
          </div>
          <FontAwesomeIcon icon="th" onClick={this.handleEditorClick} />
          <FontAwesomeIcon icon="table" onClick={this.handleTableClick} />
        </div>
        <div>{this.renderGrid()}</div>
      </div>
    );
  }
}

Grid.propTypes = {
  viewGrid: PropTypes.object,
  onCheckboxChange: PropTypes.func,
  onClick: PropTypes.func,
  onEditorClick: PropTypes.func,
  onSaveName: PropTypes.func,
  onTableClick: PropTypes.func,
};
