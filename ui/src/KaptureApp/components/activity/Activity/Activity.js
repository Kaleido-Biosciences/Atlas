import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overview } from '../Overview';
import { MultiPlateTable } from './MultiPlateTable';
import { PlateTable } from '../PlateTable';
import { ViewTab } from './ViewTab';

export class Activity extends Component {
  handleViewTabClick = (viewId) => {
    if (this.props.onViewTabClick) {
      this.props.onViewTabClick(viewId);
    }
  };
  renderViewTabs() {
    return this.props.views.map((view) => {
      return (
        <ViewTab key={view.id} view={view} onClick={this.handleViewTabClick} />
      );
    });
  }
  renderActiveView() {
    const { activeView } = this.props;
    if (activeView.type === 'Overview') {
      return (
        <Overview grids={this.props.grids} onAddPlate={this.props.onAddPlate} />
      );
    } else if (activeView.type === 'MultiPlateTable') {
      return <MultiPlateTable grids={this.props.grids} />;
    } else if (activeView.type === 'PlateTable') {
      return <PlateTable grids={activeView.grids} />;
    }
  }
  render() {
    return (
      <div>
        <div>{this.renderViewTabs()}</div>
        <div className="border border-black">{this.renderActiveView()}</div>
      </div>
    );
  }
}

Activity.propTypes = {
  activeView: PropTypes.object.isRequired,
  grids: PropTypes.array.isRequired,
  onAddPlate: PropTypes.func,
  onViewTabClick: PropTypes.func,
  views: PropTypes.array.isRequired,
};
