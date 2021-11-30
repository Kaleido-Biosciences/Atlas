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
        {this.props.view.id === 'PlateTable' ? (
          <div>
            {this.props.view.name}{' '}
            <span className="text-xxs text-gray-400">Beta</span>
          </div>
        ) : (
          <div>{this.props.view.name}</div>
        )}
      </div>
    );
  }
}

ViewTab.propTypes = {
  onClick: PropTypes.func,
  view: PropTypes.object,
};
