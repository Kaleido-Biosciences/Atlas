import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Timepoint } from './Timepoint';

export class Timepoints extends React.Component {
  handleTimepointChange = (index, timepoint) => {
    const newTimepoints = this.props.timepoints.slice();
    newTimepoints.splice(index, 1, timepoint);
    if (this.props.onChange) this.props.onChange(newTimepoints);
  };
  handleTimepointDeleteClick = (index) => {
    const newTimepoints = this.props.timepoints.slice();
    newTimepoints.splice(index, 1);
    if (this.props.onChange) this.props.onChange(newTimepoints);
  };
  handleAddTimepointClick = () => {
    const newTimepoints = this.props.timepoints.slice();
    const lastTimepoint = newTimepoints[newTimepoints.length - 1];
    newTimepoints.push({ ...lastTimepoint });
    if (this.props.onChange) this.props.onChange(newTimepoints);
  };
  render() {
    return (
      <div>
        <div>
          {this.props.timepoints.map((timepoint, i) => {
            return (
              <Timepoint
                allowDelete={i > 0}
                concentrationUnits={this.props.concentrationUnits}
                index={i}
                key={i}
                onChange={this.handleTimepointChange}
                onDeleteClick={this.handleTimepointDeleteClick}
                timepoint={timepoint}
                timeUnits={this.props.timeUnits}
              />
            );
          })}
        </div>
        <div
          className="cursor-pointer text-white text-xs opacity-60 hover:opacity-100 flex items-center mt-4"
          onClick={this.handleAddTimepointClick}
        >
          <FontAwesomeIcon icon="plus-circle" className="mr-1" />
          Add Timepoint
        </div>
      </div>
    );
  }
}

Timepoints.propTypes = {
  concentrationUnits: PropTypes.array,
  onChange: PropTypes.func,
  timepoints: PropTypes.array.isRequired,
  timeUnits: PropTypes.array,
};
