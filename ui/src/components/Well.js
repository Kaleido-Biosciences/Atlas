import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';

import { groupComponents } from '../util';
import { WellComponent } from './WellComponent';

export class Well extends Component {
  group = memoize(groupComponents);
  handleClick = () => {
    this.props.onClick(this.props.well);
  };
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
      return <WellComponent key={media.id} component={medium} />;
    });
  }
  renderSupplements(supplements) {
    return supplements.map(supplement => {
      return <WellComponent key={supplement.id} component={supplement} />;
    });
  }
  render() {
    const { selected, highlighted, dimmed, components } = this.props.well;
    const { communities, compounds, media, supplements } = this.group(
      components
    );
    return (
      <div
        onClick={this.handleClick}
        className={classNames('well', { selected, highlighted, dimmed })}
      >
        <div>{this.renderCommunities(communities)}</div>
        <div>{this.renderCompounds(compounds)}</div>
        <div>{this.renderMedia(media)}</div>
        <div>{this.renderSupplements(supplements)}</div>
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
