import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

const defaultClasses =
  'text-gray-600 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center cursor-pointer';

export class IconButton extends Component {
  constructor() {
    super();
    this.id = uuidv4();
  }
  render() {
    const { icon, onClick, tooltip, className, ...props } = this.props;
    const buttonClass = classNames(defaultClasses, className);
    return (
      <div>
        <ReactTooltip
          id={this.id}
          place="bottom"
          effect="solid"
          className="reactTooltip"
        >
          <div className="text-white text-xs px-2 py-1">
            {this.props.tooltip}
          </div>
        </ReactTooltip>
        <div data-tip="tooltip" data-for={this.id}>
          <button
            className={buttonClass}
            onClick={this.props.onClick}
            {...props}
          >
            <FontAwesomeIcon icon={this.props.icon} />
          </button>
        </div>
      </div>
    );
  }
}

IconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onClick: PropTypes.func,
  tooltip: PropTypes.string.isRequired,
};
