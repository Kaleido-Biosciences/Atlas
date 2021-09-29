import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Plate.module.css';
import classNames from 'classnames';
import { EditableText } from '../../EditableText';
import { getPlateRows } from 'AtlasUI/utils/plate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Plate extends Component {
  handleEditorClick = () => {
    if (this.props.onEditorClick) {
      this.props.onEditorClick(this.props.viewPlate.id);
    }
  };
  handleTableClick = () => {
    if (this.props.onTableClick) {
      this.props.onTableClick(this.props.viewPlate.id);
    }
  };
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.viewPlate.id, value);
    }
  };
  handleCheckboxChange = (e) => {
    if (this.props.onCheckboxChange) {
      this.props.onCheckboxChange(this.props.viewPlate.id);
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
      'shadow',
      'rounded-lg',
      'text-xs'
    );
    return (
      <div className={className}>
        <div className={styles.header}>
          <div>
            <input
              name="selected"
              checked={viewPlate.selected}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 cursor-pointer"
              onChange={this.handleCheckboxChange}
              type="checkbox"
            />
          </div>
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
  onCheckboxChange: PropTypes.func,
  onEditorClick: PropTypes.func,
  onSaveName: PropTypes.func,
  onTableClick: PropTypes.func,
};
