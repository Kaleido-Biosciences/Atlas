import React, { Component } from 'react';
import { Grid, Icon, Input, Segment, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export class AddAttributeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: null,
      value: null,
      value_type: 'String',
      value_unit: null,
    };
  }

  setKey = (event, data) => {
    this.setState({ key: data.value });
    event.preventDefault();
  };

  setValueType = (event, data) => {
    this.setState({ value_type: data.value });
    event.preventDefault();
  };

  setValueSelection = (event, data) => {
    this.setState({ value: data.value });
    event.preventDefault();
  };

  setValue = (event, data) => {
    if (this.state.value_type === 'Integer' && ! Number.isInteger(data.value)){
      alert('value not an integer');
    }
    else if (this.state.value_type === 'Float' && ! Number.isNaN(data.value)){
      alert('value not a float');
    }
    else {
      this.setState({ value: data.value });
    }
    event.preventDefault();
  };

  setValueUnit = (event, data) => {
    this.setState({ value_unit: data.value });
    event.preventDefault();
  };

  handleAddClick = (event) => {
    const {key, value, value_type, value_unit } = this.state;
    console.log(key)
  };

  renderOtherInput = () => {
    if (this.state.key && this.state.value_type) {
      return (
        <Grid.Row>
          {this.renderValueComponent()}
          <Grid.Column width={6}>
            <Input fluid size='small' title='value_unit' placeholder='Unit' onChange={this.setValueUnit}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Icon title='Add Attribute' link color='blue' size='large' name='plus circle'
                  onClick={this.handleAddClick}/>
          </Grid.Column>
        </Grid.Row>
      );
    } else {
      return "";
    }
  };

  renderValueComponent = () => {
    const { value_type } = this.state;
    const booleanOptions = [
      { key: 'True',  value: 'True', text: 'True'},
      { key: 'False', value: 'False', text: 'False'},
    ];
    if (value_type === 'Boolean'){
      return (
        <Grid.Column width={10}>
          <Select fluid
                  placeholder='Value'
                  onChange={this.setValueSelection}
                  options={booleanOptions}
          />
        </Grid.Column>
      )
    }
    else{
      return(
        <Grid.Column width={6}>
          <Input fluid size='small' title='value' placeholder='Value' onChange={this.setValue}/>
        </Grid.Column>
      )
    }
  };

  render() {
    const typeOptions = [
      { key: 'Boolean',  value: 'Boolean', text: 'Boolean'},
      { key: 'Float', value: 'Float', text: 'Float'},
      { key: 'Integer', value: 'Integer', text: 'Integer'},
      { key: 'String', value: 'String', text: 'String'},
    ];
    const { value_type } = this.state;
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Input fluid size='small' title='key' placeholder='Name' onChange={this.setKey}/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Select
                fluid
                placeholder='Value Type'
                onChange={this.setValueType}
                options={typeOptions}
                defaultValue={this.state.value_type}
              />
            </Grid.Column>
          </Grid.Row>
          {this.renderOtherInput()}
        </Grid>
      </Segment>
    );
  }
}

AddAttributeComponent.propTypes = {
  onAddClick: PropTypes.func,
};
