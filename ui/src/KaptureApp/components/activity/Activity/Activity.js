import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overview } from '../Overview';

export class Activity extends Component {
  renderViewTabs() {
    return this.props.views.map((view) => {
      return <div key={view.id}>{view.name}</div>;
    });
  }
  renderActiveView() {
    const { activeView } = this.props;
    if (activeView.type === 'Overview') {
      return (
        <Overview grids={this.props.grids} onAddPlate={this.props.onAddPlate} />
      );
    }
  }
  render() {
    return (
      <div>
        <div>{this.renderViewTabs()}</div>
        <div>{this.renderActiveView()}</div>
      </div>
    );
  }
}

Activity.propTypes = {
  activeView: PropTypes.object.isRequired,
  grids: PropTypes.array.isRequired,
  onAddPlate: PropTypes.func,
  views: PropTypes.array.isRequired,
};
