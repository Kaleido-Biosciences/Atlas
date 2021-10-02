import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'KaptureApp/components';
import { RemoveToolOption } from './RemoveToolOption';
import { SelectedWells } from '../SelectedWells';
import styles from './RemoveTool.module.css';

export class RemoveTool extends Component {
  handleSelectAll = () => {
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(
        this.props.componentTypes.map((cType) => cType.name)
      );
    }
  };
  handleDeselectAll = () => {
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange([]);
    }
  };
  handleOptionClick = (value, selected) => {
    if (this.props.onSelectionChange) {
      const newValues = this.props.componentTypesToRemove.slice();
      if (selected) {
        newValues.push(value);
      } else {
        const index = newValues.findIndex((type) => {
          return type === value;
        });
        if (index > -1) {
          newValues.splice(index, 1);
        }
      }
      this.props.onSelectionChange(newValues);
    }
  };
  handleRemoveClick = () => {
    if (this.props.onRemoveClick) {
      this.props.onRemoveClick(this.props.activeView.id);
    }
  };
  renderOptions() {
    return this.props.componentTypes.map((type) => {
      return (
        <RemoveToolOption
          componentType={type}
          key={type.name}
          onClick={this.handleOptionClick}
          selected={this.props.componentTypesToRemove.includes(type.name)}
        />
      );
    });
  }
  render() {
    return (
      <div className="flex flex-col h-full overflow-auto">
        <div className={styles.body}>
          <div className="text-xxs mt-1 mb-2">
            Select the component types to remove
          </div>
          <div className="mb-4">
            <Button className="mr-1" secondary onClick={this.handleSelectAll}>
              Select All
            </Button>
            <Button secondary onClick={this.handleDeselectAll}>
              Deselect All
            </Button>
          </div>
          <div className="mb-4">{this.renderOptions()}</div>
        </div>
        <div className={styles.selectedContainersContainer}>
          <SelectedWells
            activeView={this.props.activeView}
            buttonDisabled={
              this.props.componentTypesToRemove.length ? false : true
            }
            buttonText="Remove from"
            onButtonClick={this.handleRemoveClick}
            showButton={true}
          />
        </div>
      </div>
    );
  }
}

RemoveTool.propTypes = {
  activeView: PropTypes.object,
  componentTypes: PropTypes.array.isRequired,
  componentTypesToRemove: PropTypes.array.isRequired,
  onRemoveClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
};
