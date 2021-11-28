import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';

export class IconButton extends Component {
  constructor() {
    super();
    this.id = uuidv4();
  }
  render() {
    const { icon, onClick, tooltip, ...props } = this.props;
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
        <div
          data-tip="tooltip"
          data-for={this.id}
          onClick={this.props.onClick}
          {...props}
        >
          <FontAwesomeIcon icon={this.props.icon} />
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
