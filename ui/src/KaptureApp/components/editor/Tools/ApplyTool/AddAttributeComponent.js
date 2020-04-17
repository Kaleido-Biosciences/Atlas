import React, { Component } from 'react';
import { Grid, Icon, Form, Segment, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import { COMPONENT_TYPE_ATTRIBUTE } from '../../../../constants';

export class AddAttributeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      value: '',
      value_type: '',
      value_unit: '',
      errorMessage: null,
    };
  }

  setKey = (event, data) => {
    this.setState({ key: data.value });
    event.preventDefault();
  };

  changeValueType = (event, data) => {
    this.setState({ value_type: data.value, value: '', value_unit: '' });
    event.preventDefault();
  };

  setValueSelection = (event, data) => {
    this.setState({ value: data.value });
    event.preventDefault();
  };

  validValueWithType = () => {
    const { value_type, value } = this.state;
    let isValid = true;
    switch (value_type) {
      case 'Integer':
        isValid = validate.isInteger(Number(value));
        break;
      case 'Float':
        isValid = validate.isNumber(Number(value));
        break;
      case 'Boolean':
        isValid =
          value.toLowerCase() === 'true' || value.toLowerCase() === 'false';
        break;
      default:
        break;
    }
    return isValid;
  };

  setValue = (event, data) => {
    this.setState({ value: data.value });
    event.preventDefault();
  };

  setValueUnit = (event, data) => {
    this.setState({ value_unit: data.value });
    event.preventDefault();
  };

  renderMessage = () => {
    const { errorMessage } = this.state;
    return errorMessage ? <Message error content={errorMessage} /> : '';
  };

  handleAddClick = (event) => {
    if (!this.validValueWithType()) {
      this.setState({
        errorMessage: 'Input value does not match with selected type',
      });
    } else {
      let { key, value, value_type, value_unit } = this.state;
      if (value_type === 'Integer') {
        value = Number(value) + ''; // in case value is 0
      }
      let id = value ? (key + '_' + value).replace(/ /g, '_') : key;
      let unit = value ? (value_unit ? value_unit : '') : '';
      let name = value ? key + ': ' + value + unit : key;
      let component = {
        id: 'ATTRIBUTE_' + id,
        type: COMPONENT_TYPE_ATTRIBUTE,
        name,
        isValid: true,
        selected: true,
        data: {
          id: id,
          name,
          key: key,
          value: value,
          value_type: value_type,
          value_unit: value_unit,
        },
      };
      this.props.onAddClick({ component });
      this.setState({
        key: '',
        value: '',
        value_type: '',
        value_unit: '',
        errorMessage: '',
      });
    }
    event.preventDefault();
  };

  renderOtherInput = () => {
    const { key, value_type } = this.state;
    if (key && key.length > 0 && value_type) {
      return (
        <Grid.Row>
          {this.renderValueComponent()}
          {this.renderValueUnitComponent()}
          {this.renderAddIcon()}
        </Grid.Row>
      );
    } else {
      return '';
    }
  };

  renderAddIcon = () => {
    const { key, value_type } = this.state;
    if (value_type && key) {
      return (
        <Grid.Column width={4}>
          <Icon
            title="Add Attribute"
            link
            color="blue"
            size="large"
            name="plus circle"
            onClick={this.handleAddClick}
          />
        </Grid.Column>
      );
    }
  };

  renderValueUnitComponent = () => {
    const { value_type, value_unit } = this.state;
    if (value_type !== 'Boolean') {
      return (
        <Grid.Column width={6}>
          <Form.Input
            fluid
            size="small"
            title="value_unit"
            placeholder="Unit"
            value={value_unit}
            onChange={this.setValueUnit}
          />
        </Grid.Column>
      );
    }
  };

  renderValueComponent = () => {
    const { value, value_type } = this.state;
    const booleanOptions = [
      { key: 'True', value: 'True', text: 'True' },
      { key: 'False', value: 'False', text: 'False' },
    ];
    if (value_type === 'Boolean') {
      return (
        <Grid.Column width={10}>
          <Form.Select
            fluid
            placeholder="Value"
            onChange={this.setValueSelection}
            options={booleanOptions}
            value={value}
          />
        </Grid.Column>
      );
    } else {
      return (
        <Grid.Column width={6}>
          <Form.Input
            fluid
            size="small"
            title="value"
            placeholder="Value"
            value={value}
            onChange={this.setValue}
          />
        </Grid.Column>
      );
    }
  };

  render() {
    const typeOptions = [
      { text: 'Decimal', value: 'Float', key: 'Float' },
      { text: 'Integer', value: 'Integer', key: 'Integer' },
      { text: 'Text', value: 'String', key: 'String' },
      { text: 'True/False', value: 'Boolean', key: 'Boolean' },
    ];
    const { key, value_type } = this.state;
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Input
                fluid
                size="small"
                title="key"
                placeholder="Enter Name"
                value={key}
                onChange={this.setKey}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Select
                fluid
                placeholder="Value Type"
                onChange={this.changeValueType}
                options={typeOptions}
                value={value_type}
              />
            </Grid.Column>
          </Grid.Row>
          {this.renderOtherInput()}
          {this.renderMessage()}
        </Grid>
      </Segment>
    );
  }
}

AddAttributeComponent.propTypes = {
  onAddClick: PropTypes.func,
};
