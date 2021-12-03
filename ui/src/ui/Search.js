import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export class Search extends Component {
  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  };
  renderInput() {
    return (
      <input
        autoComplete="off"
        className={classNames(
          'focus:ring-indigo-500',
          'focus:border-indigo-500',
          'block',
          'w-full',
          'pl-4',
          'pr-12',
          'text-xs',
          'border-gray-300',
          'rounded-full',
          'placeholder-gray-400'
        )}
        onBlur={this.props.onBlur}
        onChange={this.handleChange}
        onFocus={this.props.onFocus}
        placeholder={this.props.placeholder}
        type="text"
        value={this.props.value}
      />
    );
  }
  renderIcon() {
    return (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
        {this.props.loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="#FFFFFF"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <FontAwesomeIcon icon="search" />
        )}
      </div>
    );
  }
  render() {
    return (
      <div className="w-full">
        <div className="relative rounded-md shadow-sm">
          {this.renderInput()}
          {this.renderIcon()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
