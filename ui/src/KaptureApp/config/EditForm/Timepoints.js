import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { Timepoint } from './Timepoint';
import styles from './Timepoint.module.css';

export class Timepoints extends React.Component {
  handleTimepointChange = (index, timepoint) => {
    const newTimepoints = this.props.timepoints.slice();
    newTimepoints.splice(index, 1, timepoint);
    if (this.props.onChange) {
      this.props.onChange(newTimepoints);
    }
  };
  handleTimepointDeleteClick = (index) => {
    const newTimepoints = this.props.timepoints.slice();
    newTimepoints.splice(index, 1);
    if (this.props.onChange) {
      this.props.onChange(newTimepoints);
    }
  };
  handleAddTimepointClick = () => {
    const newTimepoints = this.props.timepoints.slice();
    let time;
    if (newTimepoints.length > 0) {
      const max = newTimepoints.reduce((highest, current) => {
        return current.time > highest ? current.time : highest;
      }, 0);
      time = parseInt(max + 24);
    }
    const conc = newTimepoints[newTimepoints.length - 1]['concentration'];
    newTimepoints.push({ concentration: conc, time });
    if (this.props.onChange) {
      this.props.onChange(newTimepoints);
    }
  };
  render() {
    return (
      <div>
        <div>
          {this.props.timepoints.map((timepoint, i) => {
            return (
              <Timepoint
                allowDelete={i > 0}
                allowTimeChange={this.props.allowTimeChange}
                concentration={timepoint.concentration}
                index={i}
                key={i}
                onChange={this.handleTimepointChange}
                onDeleteClick={this.handleTimepointDeleteClick}
                time={timepoint.time}
              />
            );
          })}
        </div>
        {this.props.allowMultiple && (
          <div
            className={styles.addTimepoint}
            onClick={this.handleAddTimepointClick}
          >
            <Icon link name="plus circle" title="Add timepoint" /> Add Timepoint
          </div>
        )}
      </div>
    );
  }
}

Timepoints.propTypes = {
  allowMultiple: PropTypes.bool.isRequired,
  allowTimeChange: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  timepoints: PropTypes.array.isRequired,
};
