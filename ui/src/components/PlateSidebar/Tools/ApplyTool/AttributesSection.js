import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';

export class AttributesSection extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <ComponentsSection
        label="Attribute"
        components={attributes}
        showTimepoints={false}
        allowTimepointTimeChange={false}
        allowAddTimepoint={false}
      />
    );
  }
}

AttributesSection.propTypes = {
  attributes: PropTypes.array,
};
