import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Button extends Component {
  render() {
    const { className, content, icon, secondary, ...props } = this.props;
    let buttonClasses;
    if (secondary) {
      buttonClasses =
        'inline-flex items-center px-2.5 py-1.5 border border-gray-300  text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none';
    } else {
      buttonClasses =
        'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none';
    }
    if (className) {
      buttonClasses = buttonClasses + ' ' + className;
    }
    return (
      <button type="button" className={buttonClasses} {...props}>
        {icon ? <FontAwesomeIcon className="mr-1" icon={icon} /> : null}
        {content}
      </button>
    );
  }
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  secondary: PropTypes.bool,
};
