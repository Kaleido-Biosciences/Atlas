import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RemoveToolOption extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.componentType.name, !this.props.selected);
    }
  };
  render() {
    const { componentType } = this.props;
    return (
      <div
        className="flex flex-row items-center cursor-pointer mb-1"
        onClick={this.handleClick}
      >
        <input
          checked={this.props.selected}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
          name={componentType.name}
          readOnly
          type="checkbox"
          value={componentType.name}
        />
        <div className="flex flex-row items-center">
          <div
            className="rounded-full h-4 w-4 ml-2 mr-1"
            style={{
              background: componentType.colorCode,
            }}
          ></div>
          <div className="text-sm font-light">
            {componentType.pluralDisplayName}
          </div>
        </div>
      </div>
    );
  }
}

RemoveToolOption.propTypes = {
  componentType: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};
