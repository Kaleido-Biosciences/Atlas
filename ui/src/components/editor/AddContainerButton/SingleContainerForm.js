import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

export class SingleContainerForm extends Component {
  handleChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange({
        containerType: value,
      });
    }
  };
  render() {
    const { options } = this.props;
    return (
      <Select
        placeholder="Select a container type"
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

SingleContainerForm.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

SingleContainerForm.defaultProps = {
  options: [
    { key: 'Tube', value: 'Tube', text: 'Tube' },
    { key: 'PetriDish', value: 'PetriDish', text: 'Petri Dish' },
    { key: 'Other', value: 'Other', text: 'Other' },
  ],
};
