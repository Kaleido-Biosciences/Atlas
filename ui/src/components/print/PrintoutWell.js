import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { groupComponents } from '../../store/plateFunctions';
import { WellComponent } from './PrintoutWellComponent';

export class PrintoutWell extends Component {
  group = memoize(groupComponents);
  renderCommunities(communities) {
    return communities.map(community => {
      return <WellComponent key={community.id} component={community} />;
    });
  }
  renderCompounds(compounds) {
    return compounds.map(compound => {
      return <WellComponent key={compound.id} component={compound} />;
    });
  }
  renderMedia(media) {
    return media.map(medium => {
      return <WellComponent key={medium.id} component={medium} />;
    });
  }
  renderSupplements(supplements) {
    return supplements.map(supplement => {
      return <WellComponent key={supplement.id} component={supplement} />;
    });
  }
  renderAttributes(attributes) {
    return attributes.map(attribute => {
      return <WellComponent key={attribute.id} component={attribute} />;
    });
  }
  render() {
    const { components } = this.props.well;
    const {
      communities,
      compounds,
      media,
      supplements,
      attributes,
    } = this.group(components);
    return (
      <div>
        <div>{this.renderCommunities(communities)}</div>
        <div>{this.renderCompounds(compounds)}</div>
        <div>{this.renderMedia(media)}</div>
        <div>{this.renderSupplements(supplements)}</div>
        <div>{this.renderSupplements(attributes)}</div>
      </div>
    );
  }
}

PrintoutWell.propTypes = {
  well: PropTypes.object.isRequired,
};