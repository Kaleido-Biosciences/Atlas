import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { groupComponents } from '../../store/plateFunctions';
import { PrintWellComponent } from './PrintWellComponent';
import styles from './PrintWell.module.css';

export class PrintWell extends Component {
  group = memoize(groupComponents);
  renderCommunities(communities) {
    return communities.map(community => {
      return <PrintWellComponent key={community.id} component={community} />;
    });
  }
  renderCompounds(compounds) {
    return compounds.map(compound => {
      return <PrintWellComponent key={compound.id} component={compound} />;
    });
  }
  renderMedia(media) {
    return media.map(medium => {
      return <PrintWellComponent key={medium.id} component={medium} />;
    });
  }
  renderSupplements(supplements) {
    return supplements.map(supplement => {
      return <PrintWellComponent key={supplement.id} component={supplement} />;
    });
  }
  renderAttributes(attributes) {
    return attributes.map(attribute => {
      return <PrintWellComponent key={attribute.id} component={attribute} />;
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
      <div className={styles.printWell}>
        <div>{this.renderCommunities(communities)}</div>
        <div>{this.renderCompounds(compounds)}</div>
        <div>{this.renderMedia(media)}</div>
        <div>{this.renderSupplements(supplements)}</div>
        <div>{this.renderAttributes(attributes)}</div>
      </div>
    );
  }
}

PrintWell.propTypes = {
  well: PropTypes.object.isRequired,
};
