import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

export class ComponentTooltip extends Component {
  render() {
    const renderedItems = this.props.tooltip.map((item) => {
      return (
        <div className="mb-3 last:mb-0 text-xxs" key={item.label}>
          <div className="text-gray-400">{item.label}</div>
          <div className="text-gray-800">{item.value}</div>
        </div>
      );
    });
    return (
      <ReactTooltip
        backgroundColor="#FFF"
        border={true}
        borderColor="#d1d5db"
        className="reactTooltip"
        id={this.props.id}
        type="info"
      >
        <div className="p-3 max-w-xs">{renderedItems}</div>
      </ReactTooltip>
    );
  }
}

ComponentTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.array.isRequired,
};
