import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ButtonGroup extends Component {
  render() {
    const buttons = this.props.buttons.map((buttonConfig, i) => {
      const { icon, name, active, ...props } = buttonConfig;
      let classes = [
        'relative',
        'inline-flex',
        'items-center',
        'px-4',
        'py-2',
        'focus:outline-none',
        'focus:ring-1',
        'focus:ring-indigo-500',
        'focus:border-indigo-500',
        'border',
        'border-gray-300',
        'font-medium',
        'text-gray-700',
        'focus:z-10',
        'text-xxs',
      ];
      if (i === 0) {
        classes = classes.concat(['rounded-l-md']);
      } else if (i === this.props.buttons.length - 1) {
        classes = classes.concat(['-ml-px', 'rounded-r-md']);
      } else {
        classes = classes.concat(['-ml-px']);
      }
      if (active) {
        classes = classes.concat('bg-gray-200', 'hover:bg-gray-200');
      } else {
        classes = classes.concat('bg-white', 'hover:bg-gray-50');
      }
      return (
        <button
          key={name}
          type="button"
          className={classNames(classes)}
          name={name}
          {...props}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      );
    });
    return (
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        {buttons}
      </span>
    );
  }
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array,
};
