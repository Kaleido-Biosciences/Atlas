import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';

export class CompoundsSection extends Component {
  render() {
    const { compounds } = this.props;
    return (
      <ComponentsSection
        label="Compounds"
        components={compounds}
        showTimepoints={true}
        allowTimepointTimeChange={false}
        allowAddTimepoint={false}
      />
    );
  }
}

CompoundsSection.propTypes = {
  compounds: PropTypes.array,
};
