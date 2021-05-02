import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { ToolComponent } from './ToolComponent';
import styles from './ToolComponentList.module.css';

export class ToolComponentList extends React.Component {
  getEditForm = memoize((componentType, componentTypes) => {
    return componentTypes.find((type) => {
      return type.name === componentType;
    }).editForm;
  });
  handleSelectionChange = (componentId, selection) => {
    if (this.props.onSelectionsChange) {
      this.props.onSelectionsChange([componentId], selection);
    }
  };
  handleRemove = (componentId) => {
    if (this.props.onRemove) {
      this.props.onRemove([componentId]);
    }
  };
  render() {
    return (
      <div className={styles.toolComponentList}>
        {this.props.toolComponents.map((component) => {
          const editForm = this.getEditForm(
            component.type,
            this.props.componentTypes
          );
          return (
            <ToolComponent
              editForm={editForm}
              key={component.id}
              onRemove={this.handleRemove}
              onSelectionChange={this.handleSelectionChange}
              onUpdate={this.props.onUpdate}
              toolComponent={component}
            />
          );
        })}
      </div>
    );
  }
}

ToolComponentList.propTypes = {
  componentTypes: PropTypes.array,
  onSelectionsChange: PropTypes.func,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  toolComponents: PropTypes.array,
};
