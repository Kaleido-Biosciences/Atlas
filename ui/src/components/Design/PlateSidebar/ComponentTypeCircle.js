import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import {
  COMPONENT_TYPE_ABBREVIATIONS,
  COMPONENT_TYPE_COLORS,
} from '../../../constants';

export class ComponentTypeCircle extends Component {
  render() {
    const { type, className } = this.props;
    const color = COMPONENT_TYPE_COLORS[type];
    const letter = COMPONENT_TYPE_ABBREVIATIONS[type];
    return (
      <Label circular color={color} className={className}>
        {letter}
      </Label>
    );
  }
}

ComponentTypeCircle.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};