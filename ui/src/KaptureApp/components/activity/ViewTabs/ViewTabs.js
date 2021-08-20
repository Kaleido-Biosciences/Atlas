import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewTab } from './ViewTab';

export class ViewTabs extends Component {
  handleTabClick = (viewId) => {
    if (this.props.onTabClick) {
      this.props.onTabClick(viewId);
    }
  };
  renderViewTabs() {
    return this.props.views.map((view) => {
      return (
        <ViewTab key={view.id} view={view} onClick={this.handleTabClick} />
      );
    });
  }
  render() {
    return (
      <div className="w-full bg-gray-100">
        <div className="flex flex-row">{this.renderViewTabs()}</div>
      </div>
    );
  }
}

ViewTabs.propTypes = {
  onTabClick: PropTypes.func,
  views: PropTypes.array.isRequired,
};
