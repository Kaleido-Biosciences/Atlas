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
  state = {
    bringForward: false,
  };
  handleMouseDown = (e) => {
    e.stopPropagation();
    document.getSelection().removeAllRanges();
    if (this.props.onClick) {
      if (e.ctrlKey) {
        this.props.onClick(this.props.plate.id, 'ctrl');
      } else if (e.shiftKey) {
        this.props.onClick(this.props.plate.id, 'shift');
      } else if (e.metaKey) {
        this.props.onClick(this.props.plate.id, 'meta');
      } else {
        this.props.onClick(this.props.plate.id);
      }
    }
  };
  handleEditorClick = (e) => {
    e.stopPropagation();
    if (this.props.onEditorClick) {
      this.props.onEditorClick(this.props.plate.id);
    }
  };
  handleTableClick = (e) => {
    e.stopPropagation();
    if (this.props.onTableClick) {
      this.props.onTableClick(this.props.plate.id);
    }
  };
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.plate.id, value);
    }
  };
  handleTooltipEnter = () => {
    this.setState({ bringForward: true });
  };
  handleTooltipLeave = () => {
    this.setState({ bringForward: false });
  };
  handleDragStart = (e) => {
    this.setState({ bringForward: true });
  };
  handleDragStop = (e, { lastX, lastY }) => {
    this.setState({ bringForward: false });
    const { plate } = this.props;
    if (
      plate.overviewPositionTop !== lastY ||
      plate.overviewPositionLeft !== lastX
    ) {
      if (this.props.onUpdatePlateDetails) {
        this.props.onUpdatePlateDetails(this.props.plate.id, {
          overviewPositionTop: lastY,
          overviewPositionLeft: lastX,
        });
      }
    }
  };
  renderPlate() {
    const rows = getPlateRows(this.props.plate);
    let className;
    const renderedRows = rows.map((row, i) => {
      const wells = row.map((well) => {
        if (well.selected) {
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
    const { plate } = this.props;
    let zIndex = this.props.zIndex;
    if (this.state.bringForward) {
      zIndex = 102;
    } else if (plate.selected) {
      zIndex = 101;
    }
    const { overviewPositionLeft, overviewPositionTop } = plate;
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
      { 'border-indigo-500 hover:border-indigo-600': plate.selected }
    );
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex,
      width: plate.overviewWidth,
      height: plate.overviewHeight,
    };
    return (
      <Draggable
        grid={[10, 10]}
        onMouseDown={this.handleMouseDown}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
        position={{
          x: overviewPositionLeft,
          y: overviewPositionTop,
        }}
      >
        <div className={className} style={style}>
          <div className={styles.header}>
            <div className="text-xs font-medium flex flex-row justify-between w-full">
              <div>
                <EditableText onSave={this.handleSaveName} value={plate.name} />
                <div className="text-xxs text-gray-400">{plate.barcode}</div>
              </div>
              <div>
                <FontAwesomeIcon
                  onMouseEnter={this.handleTooltipEnter}
                  onMouseLeave={this.handleTooltipLeave}
                  icon="info-circle"
                  className="text-gray-300 focus:outline-none"
                  data-place={
                    plate.overviewPositionTop <= 40 ? 'bottom' : 'top'
                  }
                  data-tip={true}
                  data-for={`${plate.id}`}
                />
                <PlateTooltip id={`${plate.id}`} plate={plate} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">{this.renderPlate()}</div>
          {plate.numRows > 0 && plate.numCols > 0 ? (
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
  onClick: PropTypes.func,
  onEditorClick: PropTypes.func,
  onSaveName: PropTypes.func,
  onTableClick: PropTypes.func,
  onUpdatePlateDetails: PropTypes.func,
  plate: PropTypes.object,
  zIndex: PropTypes.string,
};
