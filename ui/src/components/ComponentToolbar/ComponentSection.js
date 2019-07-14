import React, { Component } from 'react';
import { ToolbarComponent } from './ToolbarComponent';

export class ComponentSection extends Component {
  renderComponents = components => {
    const {
      onSelect,
      onDeselect,
      showTimepoints,
      showConcentration,
      onRemoveClick,
      onComponentAddTimepointClick,
      onComponentTimepointChange,
    } = this.props;
    return (
      <React.Fragment>
        {components.map(component => {
          return (
            <ToolbarComponent
              key={component.id}
              component={component}
              onSelect={onSelect}
              onDeselect={onDeselect}
              showTimepoints={showTimepoints}
              showConcentration={showConcentration}
              onRemoveClick={onRemoveClick}
              onAddTimepointClick={onComponentAddTimepointClick}
              onTimepointChange={onComponentTimepointChange}
            />
          );
        })}
      </React.Fragment>
    );
  };
  render() {
    const { label, components } = this.props;
    return (
      <div className="component-section">
        <label className="component-label">{label}</label>
        <div className="components">{this.renderComponents(components)}</div>
      </div>
    );
  }
}
