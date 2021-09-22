import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const commonClasses =
  'inline-flex items-center px-2.5 py-1.5 border text-xs font-medium rounded focus:outline-none';

export class Button extends Component {
  render() {
    const { className, icon, secondary, ...props } = this.props;
    const content = this.props.content || this.props.children;
    let buttonClasses = commonClasses;
    if (secondary) {
      buttonClasses += ' border-gray-300 text-gray-700 bg-white';
      if (!this.props.disabled) buttonClasses += ' hover:bg-gray-50';
    } else {
      buttonClasses += ' border-transparent text-white bg-indigo-600';
      if (!this.props.disabled) buttonClasses += ' hover:bg-indigo-700';
    }
    if (this.props.disabled) {
      buttonClasses += ' disabled:opacity-50';
    }
    if (className) {
      buttonClasses += ' ' + className;
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
  content: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  secondary: PropTypes.bool,
};
