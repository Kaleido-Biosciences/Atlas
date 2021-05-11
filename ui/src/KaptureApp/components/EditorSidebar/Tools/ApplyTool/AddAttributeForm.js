import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import validate from 'validate.js';

import styles from './AddAttributeForm.module.css';

const valueTypeOptions = [
  { text: 'Decimal', value: 'Float', key: 'Float' },
  { text: 'Integer', value: 'Integer', key: 'Integer' },
  { text: 'Text', value: 'String', key: 'String' },
  { text: 'True/False', value: 'Boolean', key: 'Boolean' },
];

const booleanOptions = [
  { key: 'True', value: 'True', text: 'True' },
  { key: 'False', value: 'False', text: 'False' },
];

const validateNewState = (newState) => {
  let nameMessage = '',
    valueMessage = '';
  if (!newState.name && !newState.namePristine) {
    nameMessage = 'A name is required';
  }
  if (newState.value) {
    if (newState.valueType === 'Integer') {
      if (!validate.isInteger(Number(newState.value))) {
        valueMessage = 'Value must be an integer';
      }
    } else if (newState.valueType === 'Float') {
      if (!validate.isNumber(Number(newState.value))) {
        valueMessage = 'Value must be a decimal';
      }
    }
  }
  newState.nameMessage = nameMessage;
  newState.valueMessage = valueMessage;
  if (!newState.name || !newState.valueType || valueMessage) {
    newState.isValid = false;
  } else {
    newState.isValid = true;
  }
  return newState;
};

export class AddAttributeForm extends React.Component {
  state = {
    name: '',
    namePristine: true,
    valueType: '',
    value: '',
    valueUnit: '',
    nameMessage: '',
    valueMessage: '',
    isValid: false,
  };
  handleNameChange = (e, { value }) => {
    const newState = validateNewState({
      ...this.state,
      name: value,
      namePristine: false,
    });
    this.setState(newState);
  };
  handleValueTypeChange = (e, { value }) => {
    const newState = validateNewState({
      ...this.state,
      valueType: value,
      value: value === 'Boolean' ? 'True' : '',
      valueUnit: '',
    });
    this.setState(newState);
  };
  handleValueChange = (e, { value }) => {
    const newState = validateNewState({
      ...this.state,
      value,
    });
    this.setState(newState);
  };
  handleValueUnitChange = (e, { value }) => {
    this.setState({
      valueUnit: value,
    });
  };
  handleAddClick = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        key: this.state.name,
        valueType: this.state.valueType,
        value: this.state.value,
        valueUnit: this.state.valueUnit,
      });
    }
  };
  renderValueFields() {
    if (this.state.valueType === '') {
      return null;
    } else if (this.state.valueType === 'Boolean') {
      return (
        <Form.Select
          label="Value"
          onChange={this.handleValueChange}
          options={booleanOptions}
          value={this.state.value}
          fluid
        />
      );
    } else {
      return (
        <Form.Group widths="equal">
          <Form.Input
            label="Value"
            value={this.state.value}
            onChange={this.handleValueChange}
            error={
              this.state.valueMessage
                ? { content: this.state.valueMessage, pointing: 'above' }
                : null
            }
            fluid
          />
          <Form.Input
            label="Unit"
            value={this.state.valueUnit}
            onChange={this.handleValueUnitChange}
            fluid
          />
        </Form.Group>
      );
    }
  }
  render() {
    return (
      <div className={styles.addAttributeForm}>
        <Form>
          <Form.Input
            label="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
            error={
              this.state.nameMessage
                ? { content: this.state.nameMessage, pointing: 'above' }
                : null
            }
          />
          <Form.Select
            label="Value Type"
            options={valueTypeOptions}
            placeholder="Value Type"
            value={this.state.valueType}
            onChange={this.handleValueTypeChange}
            fluid
          />
          {this.renderValueFields()}
        </Form>
        <div className={styles.buttonContainer}>
          <Button
            primary
            size="mini"
            onClick={this.handleAddClick}
            disabled={!this.state.isValid}
          >
            Add Attribute
          </Button>
          <Button onClick={this.props.onClose} size="mini">
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

AddAttributeForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};
