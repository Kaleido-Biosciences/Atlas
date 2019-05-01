import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Well extends Component {
  handleClick = () => {
    this.props.onClick(this.props.well);
  };
  renderCommunities() {
    return this.props.well.communities.map(community => {
      return (
        <div key={community.name}>{`${community.name} @ ${
          community.concentration
        } %`}</div>
      );
    });
  }
  renderCompounds() {
    return this.props.well.compounds.map(compound => {
      return (
        <div key={compound.name}>{`${compound.name} @ ${
          compound.concentration
        } %`}</div>
      );
    });
  }
  renderMedia() {
    return this.props.well.media.map(medium => {
      return <div key={medium.name}>{`${medium.name}`}</div>;
    });
  }
  render() {
    const { selected } = this.props.well;
    return (
      <div
        onClick={this.handleClick}
        className={classNames('well', { selected })}
      >
        <div>{this.renderCommunities()}</div>
        <div>{this.renderCompounds()}</div>
        <div>{this.renderMedia()}</div>
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
