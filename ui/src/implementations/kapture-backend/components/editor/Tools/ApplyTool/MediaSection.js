import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';

export class MediaSection extends Component {
  render() {
    const { media } = this.props;
    return (
      <ComponentsSection
        label="Media"
        components={media}
        showTimepoints={false}
        allowTimepointTimeChange={false}
        allowAddTimepoint={false}
      />
    );
  }
}

MediaSection.propTypes = {
  media: PropTypes.array,
};
