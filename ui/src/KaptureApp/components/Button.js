import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    let className;
    if (!this.props.secondary) {
      className =
        'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none';
    } else {
      className =
        'inline-flex items-center px-2.5 py-1.5 border border-gray-300  text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none';
    }
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    return (
      <button type="button" className={className}>
        {this.props.content}
      </button>
    );
  }
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
};
