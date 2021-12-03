import React from 'react';
import PropTypes from 'prop-types';
import { ComponentService } from 'services/ComponentService';
import { ToolComponent } from './ToolComponent';

export class ToolComponentList extends React.Component {
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
      <div className="pb-3">
        {this.props.toolComponents.map((component) => {
          const editForm = ComponentService.getEditForm(component);
          return (
            <ToolComponent
              editForm={editForm}
              key={component.id}
              onEditClick={this.props.onEditClick}
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
  onEditClick: PropTypes.func,
  onSelectionsChange: PropTypes.func,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  toolComponents: PropTypes.array,
};
