import React, { Component } from 'react';

import { ToolbarComponent } from './ToolbarComponent';
import styles from './ComponentSection.module.css';

export class ComponentSection extends Component {
  renderComponents = components => {
    const {
      onSelect,
      onDeselect,
      showTimepoints,
      allowTimepointTimeChange,
      allowAddTimepoint,
      onRemoveClick,
      onComponentAddTimepointClick,
      onComponentTimepointChange,
      onComponentTimepointDeleteClick,
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
              allowTimepointTimeChange={allowTimepointTimeChange}
              allowAddTimepoint={allowAddTimepoint}
              onRemoveClick={onRemoveClick}
              onAddTimepointClick={onComponentAddTimepointClick}
              onTimepointChange={onComponentTimepointChange}
              onTimepointDeleteClick={onComponentTimepointDeleteClick}
            />
          );
        })}
      </React.Fragment>
    );
  };
  render() {
    const { label, components } = this.props;
    return (
      <div className={styles.componentSection}>
        <h4>{label}</h4>
        <div className="components">{this.renderComponents(components)}</div>
      </div>
    );
  }
}
