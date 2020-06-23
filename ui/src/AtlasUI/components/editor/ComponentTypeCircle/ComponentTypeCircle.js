import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

export class ComponentTypeCircle extends Component {
  render() {
    const { color, text, className } = this.props;
    return (
      <Label circular color={color} className={className}>
        {text}
      </Label>
    );
  }
}

ComponentTypeCircle.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};
