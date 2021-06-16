import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import { RemoveToolOption } from './RemoveToolOption';
import { SelectedContainers } from '../SelectedContainers';
import styles from './RemoveTool.module.css';

export class RemoveTool extends Component {
  handleChange = (e, data) => {
    const { checked, value } = data;
    if (this.props.onChange) {
      const newValues = this.props.componentTypesToRemove.slice();
      if (checked) {
        newValues.push(value);
      } else {
        const index = newValues.findIndex((type) => {
          return type === value;
        });
        if (index > -1) {
          newValues.splice(index, 1);
        }
      }
      this.props.onChange(newValues);
    }
  };
  handleSelectAll = () => {
    if (this.props.onChange) {
      this.props.onChange(this.props.componentTypes.map((cType) => cType.name));
    }
  };
  handleDeselectAll = () => {
    if (this.props.onChange) {
      this.props.onChange([]);
    }
  };
  handleRemoveClick = () => {
    if (this.props.onRemoveClick) {
      this.props.onRemoveClick(this.props.activeGridId);
    }
  };
  renderFields() {
    return this.props.componentTypes.map((type) => {
      return (
        <Form.Field key={type.name}>
          <RemoveToolOption
            componentType={type}
            checked={this.props.componentTypesToRemove.includes(type.name)}
            onClick={this.handleChange}
          />
        </Form.Field>
      );
    });
  }
  render() {
    const showSelectedContainers =
      this.props.selectedContainersSummary &&
      this.props.selectedContainersSummary.count
        ? true
        : false;
    const selectedContainersButtonDisabled = this.props.componentTypesToRemove
      .length
      ? false
      : true;
    return (
      <div className={styles.removeTool}>
        <div className={styles.body}>
          <div className={styles.message}>
            Select the component types to remove
          </div>
          <div className={styles.buttons}>
            <Button compact size="mini" onClick={this.handleSelectAll}>
              Select All
            </Button>
            <Button compact size="mini" onClick={this.handleDeselectAll}>
              Deselect All
            </Button>
          </div>
          <Form>{this.renderFields()}</Form>
        </div>
        {showSelectedContainers && (
          <div className={styles.selectedContainersContainer}>
            <SelectedContainers
              buttonDisabled={selectedContainersButtonDisabled}
              buttonText="Remove from"
              onButtonClick={this.handleRemoveClick}
              selectedContainersSummary={this.props.selectedContainersSummary}
              showButton={true}
            />
          </div>
        )}
      </div>
    );
  }
}

RemoveTool.propTypes = {
  activeGridId: PropTypes.string,
  componentTypesToRemove: PropTypes.array.isRequired,
  componentTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onRemoveClick: PropTypes.func,
  selectedContainersSummary: PropTypes.object.isRequired,
};
