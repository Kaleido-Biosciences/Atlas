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
          className = classNames(
            styles.container,
            'bg-blue-200',
            'border-blue-200'
          );
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
      'text-xs',
      'cursor-pointer'
    );
    return (
      <div className={className}>
        <div className={styles.header}>
          <div>
            <input
              name="selected"
              checked={viewPlate.selected}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
              onChange={this.handleCheckboxChange}
              type="checkbox"
            />
          </div>
          <div className="text-xs font-medium">
            <EditableText
              onSave={this.handleSaveName}
              value={viewPlate.plate.name}
            />
          </div>
          <FontAwesomeIcon icon="th" onClick={this.handleEditorClick} />
          <FontAwesomeIcon icon="table" onClick={this.handleTableClick} />
        </div>
        <div>{this.renderPlate()}</div>
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
