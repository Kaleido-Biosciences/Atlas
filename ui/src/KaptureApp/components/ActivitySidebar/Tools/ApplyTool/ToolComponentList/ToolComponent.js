import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export class ToolComponent extends React.Component {
  handleCheckboxClick = () => {
    const { toolComponent } = this.props;
    const selection = !toolComponent.selected;
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(toolComponent.id, selection);
    }
  };
  handleRemoveClick = () => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.toolComponent.id);
    }
  };
  handleEditClick = () => {
    if (this.props.toolComponent.editable) {
      if (this.props.onEditClick) {
        this.props.onEditClick(this.props.toolComponent);
      }
    }
  };
  handleEditFormChange = (updatedComponent) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(updatedComponent);
    }
  };
  renderValidationErrors = () => {
    return this.props.toolComponent.form.errors.map((error, i) => {
      return <div key={i}>{error}</div>;
    });
  };
  render() {
    const { toolComponent } = this.props;
    const EditForm = this.props.editForm;
    const componentClass = classNames(
      'px-2',
      'rounded',
      toolComponent.defaultBgClass,
      toolComponent.selected ? 'opacity-100' : 'opacity-30',
      'mb-1'
    );
    return (
      <div className={componentClass}>
        <div className="flex items-center">
          <div className="flex items-center" onClick={this.handleCheckboxClick}>
            <FontAwesomeIcon
              className="text-white text-sm cursor-pointer opacity-60 hover:opacity-100"
              icon={toolComponent.selected ? 'check-square' : 'square'}
            />
          </div>
          <div
            className="cursor-pointer px-2 py-2 flex-shrink flex-grow"
            onClick={this.handleEditClick}
          >
            <div className="text-white text-12 font-medium mb-0.5">{`${toolComponent.name}`}</div>
            {toolComponent.description ? (
              <div className="text-white text-10 opacity-70">
                {toolComponent.description}
              </div>
            ) : null}
          </div>
          <div className="flex items-center" onClick={this.handleRemoveClick}>
            <FontAwesomeIcon
              className="text-white text-sm cursor-pointer opacity-60 hover:opacity-100"
              icon="times"
            />
          </div>
        </div>
        {toolComponent.displayEditForm && EditForm ? (
          <div className="pb-2">
            <EditForm
              component={toolComponent}
              onChange={this.handleEditFormChange}
            />
            {toolComponent.form.errors.length > 0 && (
              <div className="text-xs text-white mt-2 font-bold">
                {this.renderValidationErrors()}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

ToolComponent.propTypes = {
  editForm: PropTypes.func,
  onEditClick: PropTypes.func,
  onRemove: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onUpdate: PropTypes.func,
  toolComponent: PropTypes.object,
};
