import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';

import styles from './Timepoint.module.css';

export class Timepoint extends Component {
  handleConcChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.index, {
        concentration: value ? parseFloat(value) : '',
        time: this.props.time,
      });
    }
  };
  handleTimeChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.index, {
        concentration: this.props.concentration,
        time: value ? parseInt(value) : '',
      });
    }
  };
  handleDeleteClick = () => {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(this.props.index);
    }
  };
  render() {
    return (
      <div className={styles.timepoint}>
        <div className={styles.field}>
          <label>Conc.</label>
          <div className={styles.inputContainer}>
            <Input
              fluid
              name="concentration"
              onChange={this.handleConcChange}
              type="number"
              value={this.props.concentration}
            />
          </div>
        </div>
        {this.props.allowTimeChange && (
          <div className={styles.field}>
            <label>Time</label>
            <div className={styles.inputContainer}>
              <Input
                fluid
                name="time"
                onChange={this.handleTimeChange}
                type="number"
                value={this.props.time}
              />
            </div>
          </div>
        )}
        {this.props.allowDelete && (
          <Icon
            className={styles.removeIcon}
            link
            name="minus circle"
            onClick={this.handleDeleteClick}
            title="Remove timepoint"
          />
        )}
      </div>
    );
  }
}

Timepoint.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  allowTimeChange: PropTypes.bool.isRequired,
  concentration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onDeleteClick: PropTypes.func,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
