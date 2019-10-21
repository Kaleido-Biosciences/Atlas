import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';

export class CommunitiesSection extends Component {
  render() {
    const { communities } = this.props;
    return (
      <ComponentsSection
        label="Communities"
        components={communities}
        showTimepoints={true}
        allowTimepointTimeChange={true}
        allowAddTimepoint={true}
      />
    );
  }
}

CommunitiesSection.propTypes = {
  communities: PropTypes.array,
};
