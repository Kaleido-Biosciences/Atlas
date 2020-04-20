import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';

import styles from './Timepoint.module.css';

export class Timepoint extends Component {
  handleChange = (e, { name, value }) => {
    const { index, onChange } = this.props;
    if (onChange) {
      if (value) {
        const parsedValue =
          name === 'time' ? parseInt(value) : parseFloat(value);
        onChange({ name, value: parsedValue, index });
      } else {
        onChange({ name, index, value: '' });
      }
    }
  };
  handleDeleteClick = () => {
    const { index, onDeleteClick } = this.props;
    if (onDeleteClick) {
      onDeleteClick({ index });
    }
  };
  render() {
    const { timepoint, allowDelete, allowTimeChange } = this.props;
    return (
      <div className={styles.timepoint}>
        <div className={styles.concField}>
          <Icon
            className={styles.fieldIcon}
            name="percent"
            title="Concentration"
          />
          <div className={styles.concInputContainer}>
            <Input
              fluid
              name="concentration"
              type="number"
              value={timepoint.concentration}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {allowTimeChange && (
          <div className={styles.timeField}>
            <Icon
              className={styles.fieldIcon}
              name="clock"
              title="Time in hours"
            />
            <div className={styles.timeInputContainer}>
              <Input
                fluid
                name="time"
                type="number"
                value={timepoint.time}
                onChange={this.handleChange}
              />
            </div>
          </div>
        )}
        {allowDelete && (
          <Icon
            link
            color="red"
            className={styles.removeIcon}
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
  timepoint: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
