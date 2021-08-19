import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ViewTab extends Component {
  handleClick = (viewId) => {
    if (this.props.onClick) {
      this.props.onClick(this.props.view.id);
    }
  };
  render() {
    return (
      <div onClick={this.handleClick}>
        <div>{this.props.view.name}</div>
      </div>
    );
  }
}

ViewTab.propTypes = {
  onClick: PropTypes.func,
  view: PropTypes.object,
};
