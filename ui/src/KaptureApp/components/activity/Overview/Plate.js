import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPlateRows } from 'models';
import { EditableText } from 'KaptureApp/components';
import Draggable from 'react-draggable';
import { PlateTooltip } from './PlateTooltip';
import styles from './Plate.module.css';

export class Plate extends Component {
  handleMouseDown = (e) => {
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
  handleDragStop = (e, { lastX, lastY }) => {
    const { plate } = this.props.viewPlate;
    if (
      plate.overviewPositionTop !== lastY ||
      plate.overviewPositionLeft !== lastX
    ) {
      if (this.props.onUpdatePlateDetails) {
        this.props.onUpdatePlateDetails(this.props.viewPlate.id, {
          overviewPositionTop: lastY,
          overviewPositionLeft: lastX,
        });
      }
    }
  };
  renderPlate() {
    const rows = getPlateRows(this.props.viewPlate.plate);
    const selections = this.props.viewPlate.selectedWells;
    let className;
    const renderedRows = rows.map((row, i) => {
      const wells = row.map((well) => {
        if (selections.includes(well.id)) {
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
        return <div className={className} key={well.id}></div>;
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
    const { viewPlate, zIndex } = this.props;
    const { overviewPositionLeft, overviewPositionTop } = viewPlate.plate;
    const className = classNames(
      styles.plate,
      'inline-block',
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
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex,
      width: viewPlate.plate.overviewWidth,
      height: viewPlate.plate.overviewHeight,
    };
    return (
      <Draggable
        defaultPosition={{
          x: overviewPositionLeft,
          y: overviewPositionTop,
        }}
        grid={[10, 10]}
        onMouseDown={this.handleMouseDown}
        onStop={this.handleDragStop}
      >
        <div className={className} style={style}>
          <div className={styles.header}>
            <div className="text-xs font-medium flex flex-row justify-between w-full">
              <div>
                <EditableText
                  onSave={this.handleSaveName}
                  value={viewPlate.plate.name}
                />
                <div className="text-xxs text-gray-400">
                  {viewPlate.plate.barcode}
                </div>
              </div>
              <div>
                <FontAwesomeIcon
                  icon="info-circle"
                  className="text-gray-300"
                  data-place={
                    viewPlate.plate.overviewPositionTop < 40 ? 'bottom' : 'top'
                  }
                  data-tip={true}
                  data-for={`${viewPlate.plate.id}`}
                />
                <PlateTooltip
                  id={`${viewPlate.plate.id}`}
                  plate={viewPlate.plate}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">{this.renderPlate()}</div>
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
      </Draggable>
    );
  }
}

Plate.propTypes = {
  viewPlate: PropTypes.object,
  onClick: PropTypes.func,
  onEditorClick: PropTypes.func,
  onSaveName: PropTypes.func,
  onTableClick: PropTypes.func,
  onUpdatePlateDetails: PropTypes.func,
  zIndex: PropTypes.string,
};
