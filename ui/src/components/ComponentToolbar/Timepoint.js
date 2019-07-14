import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';

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
    const { timepoint, allowDelete } = this.props;
    return (
      <div className="timepoint">
        <Icon name="clock" />
        <Input
          name="time"
          type="number"
          value={timepoint.time}
          onChange={this.handleChange}
        />
        <Icon name="percent" />
        <Input
          name="concentration"
          type="number"
          value={timepoint.concentration}
          onChange={this.handleChange}
        />
        {allowDelete && (
          <Icon name="minus circle" onClick={this.handleDeleteClick} />
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
