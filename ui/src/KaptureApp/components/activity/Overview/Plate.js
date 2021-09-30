import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPlateRows } from 'models';
import { EditableText } from 'KaptureApp/components';
import styles from './Plate.module.css';

export class Plate extends Component {
  handleClick = (e) => {
    e.stopPropagation();
    document.getSelection().removeAllRanges();
    if (this.props.onClick) {
      if (e.ctrlKey) {
        this.props.onClick(this.props.viewPlate.id, 'ctrl');
      } else if (e.shiftKey) {
        this.props.onClick(this.props.viewPlate.id, 'shift');
      } else if (e.metaKey) {
        this.props.onClick(this.props.viewPlate.id, 'meta');
      } else {
        this.props.onClick(this.props.viewPlate.id);
      }
    }
  };
  handleEditorClick = (e) => {
    e.stopPropagation();
    if (this.props.onEditorClick) {
      this.props.onEditorClick(this.props.viewPlate.id);
    }
  };
  handleTableClick = (e) => {
    e.stopPropagation();
    if (this.props.onTableClick) {
      this.props.onTableClick(this.props.viewPlate.id);
    }
  };
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.viewPlate.id, value);
    }
  };
  renderPlate() {
    const rows = getPlateRows(this.props.viewPlate.plate);
    const selections = this.props.viewPlate.selectedWells;
    let className;
    const renderedRows = rows.map((row, i) => {
      const wells = row.map((well) => {
        if (selections.includes(well.name)) {
          className = classNames(styles.container, {
            'border-blue-400': well.components.length > 0,
            'bg-blue-400': well.components.length > 0,
            'border-blue-200': well.components.length === 0,
            'bg-blue-200': well.components.length === 0,
          });
        } else {
          className = classNames(styles.container, {
            'border-gray-400': well.components.length > 0,
            'bg-gray-400': well.components.length > 0,
            'border-gray-200': well.components.length === 0,
            'bg-gray-200': well.components.length === 0,
          });
        }
        return <div className={className} key={well.name}></div>;
      });
      return (
        <div className={styles.row} key={`ROW${i}`}>
          {wells}
        </div>
      );
    });
    return <div>{renderedRows}</div>;
  }
  render() {
    const { viewPlate } = this.props;
    const className = classNames(
      styles.plate,
      'bg-white',
      'shadow-sm',
      'rounded-lg',
      'text-xs',
      'border-2',
      'border-gray-300',
      'cursor-pointer',
      'hover:border-gray-400',
      { 'border-indigo-500 hover:border-indigo-600': viewPlate.selected }
    );
    return (
      <div className={className} onClick={this.handleClick}>
        <div className={styles.header}>
          <div className="text-xs font-medium">
            <EditableText
              onSave={this.handleSaveName}
              value={viewPlate.plate.name}
            />
            <div className="text-xxs text-gray-400">
              {viewPlate.plate.barcode}
            </div>
          </div>
        </div>
        <div>{this.renderPlate()}</div>
        {viewPlate.plate.numRows > 0 && viewPlate.plate.numCols > 0 ? (
          <div className="flex justify-evenly pt-2">
            <FontAwesomeIcon
              className="text-gray-200 hover:text-gray-500 cursor-pointer"
              icon="th"
              onClick={this.handleEditorClick}
            />
            <FontAwesomeIcon
              className="text-gray-200 hover:text-gray-500 cursor-pointer"
              icon="table"
              onClick={this.handleTableClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

Plate.propTypes = {
  viewPlate: PropTypes.object,
  onClick: PropTypes.func,
  onEditorClick: PropTypes.func,
  onSaveName: PropTypes.func,
  onTableClick: PropTypes.func,
};
