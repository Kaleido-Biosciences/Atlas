import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';

export class SupplementsSection extends Component {
  render() {
    const { supplements } = this.props;
    return (
      <ComponentsSection
        label="Supplement"
        components={supplements}
        showTimepoints={true}
        allowTimepointTimeChange={true}
        allowAddTimepoint={true}
      />
    );
  }
}

SupplementsSection.propTypes = {
  supplements: PropTypes.array,
};
