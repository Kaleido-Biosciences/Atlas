import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ListComponent extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };
  render() {
    const { component } = this.props;
    return <div onClick={this.handleClick}>{component.displayName}</div>;
  }
}

ListComponent.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
