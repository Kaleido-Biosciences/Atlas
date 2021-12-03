import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SizeOptions extends Component {
  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.name);
    }
  };
  render() {
    const { options } = this.props;
    return (
      <div>
        <fieldset>
          <div className="flex items-center">
            {options.map((option) => {
              return (
                <div key={option.name} className="flex items-center">
                  <input
                    checked={option.name === this.props.value}
                    className="focus:ring-indigo-500 h-3 w-3 text-indigo-600 border-gray-300"
                    id={`size-${option.name}`}
                    name={option.name}
                    onChange={this.handleChange}
                    type="radio"
                  />
                  <label
                    className="ml-2 mr-4 block text-xs font-medium text-gray-700"
                    htmlFor={`size-${option.name}`}
                  >
                    {option.name}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    );
  }
}

SizeOptions.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
};
