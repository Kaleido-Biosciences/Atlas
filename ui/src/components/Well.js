import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';

import { groupComponents } from '../util';

export class Well extends Component {
  group = memoize(groupComponents);
  handleClick = () => {
    this.props.onClick(this.props.well);
  };
  renderCommunities(communities) {
    return communities.map(community => {
      return <div key={community.id}>{`${community.displayName}`}</div>;
    });
  }
  renderCompounds(compounds) {
    return compounds.map(compound => {
      return <div key={compound.id}>{`${compound.displayName}`}</div>;
    });
  }
  renderMedia(media) {
    return media.map(medium => {
      return <div key={medium.id}>{`${medium.displayName}`}</div>;
    });
  }
  render() {
    const { selected, highlighted, dimmed, components } = this.props.well;
    const { communities, compounds, media, supplements } = this.group(components);
    return (
      <div
        onClick={this.handleClick}
        className={classNames('well', { selected, highlighted, dimmed })}
      >
        <div>{this.renderCommunities(communities)}</div>
        <div>{this.renderCompounds(compounds)}</div>
        <div>{this.renderMedia(media)}</div>
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
