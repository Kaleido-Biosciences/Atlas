import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class ViewTab extends Component {
  handleClick = (viewId) => {
    if (this.props.onClick) {
      this.props.onClick(this.props.view.id);
    }
  };
  render() {
    const className = classNames(
      ['px-3', 'py-2', 'text-xs', 'cursor-pointer'],
      {
        'bg-gray-50': this.props.view.active,
        'hover:bg-gray-300': !this.props.view.active,
      }
    );
    return (
      <div className={className} onClick={this.handleClick}>
        <div>{this.props.view.name}</div>
      </div>
    );
  }
}

ViewTab.propTypes = {
  onClick: PropTypes.func,
  view: PropTypes.object,
};
