import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchResult extends Component {
  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id, this.props.name);
    }
  };
  render() {
    return (
      <div
        className="group hover:bg-indigo-500 px-3 py-2 cursor-pointer"
        onClick={this.handleClick}
      >
        <div className="text-sm font-medium text-gray-900 group-hover:text-white">
          {this.props.name}
        </div>
        <div className="text-xs text-gray-500 group-hover:text-white">
          {this.props.description}
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  description: PropTypes.string,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
