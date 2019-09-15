import React from 'react';
import PropTypes from 'prop-types';

export class Component extends React.Component {
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

Component.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
