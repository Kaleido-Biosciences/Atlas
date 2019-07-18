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
        {allowTimeChange && (
          <div className={styles.timeField}>
            <Icon className={styles.fieldIcon} name="clock" />
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
        <div className={styles.concField}>
          <Icon className={styles.fieldIcon} name="percent" />
          <div className={styles.concInputContainer}>
            <Input
              fluid
              name="concentration"
              type="number"
              value={timepoint.concentration}
              onChange={this.handleChange}
            />
          </div>
          {allowDelete && (
            <Icon className={styles.removeIcon} name="minus circle" onClick={this.handleDeleteClick} />
          )}
        </div>
      </div>
    );
  }
}

Timepoint.propTypes = {
  timepoint: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
