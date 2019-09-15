import React from 'react';
import PropTypes from 'prop-types';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };
  render() {
    const { component, count } = this.props;
    return (
      <div onClick={this.handleClick}>
        {component.displayName} {count}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
