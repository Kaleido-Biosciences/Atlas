import React, { Component } from 'react';
import { Grid, Icon, Input, Segment, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export class AddAttributeComponent extends Component {

  state = {
    key: null,
    value: null,
    value_type: null,
    value_unit: null,
  };

  handleSelectionChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleInputChange = (event) => {
    this.setState({'timepoint_hr': event.target.value});
    event.preventDefault();
  };

  handleAddClick = (event) => {
    const {key, value, value_type, value_unit } = this.state;
  };

  render() {
    const typeOptions = [
      { key: 'Boolean',  value: 'Boolean', text: 'Boolean'},
      { key: 'Float', value: 'Float', text: 'Float'},
      { key: 'Integer', value: 'Integer', text: 'Integer'},
      { key: 'String', value: 'String', text: 'String'},
    ];
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Input fluid size='small' name='key' placeholder='Name' onChange={this.handleInputChange}/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Select fluid
                placeholder='Value Type'
                onChange={this.handleSelectionChange}
                options={typeOptions}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Input fluid size='small' name='value' placeholder='Value' onChange={this.handleInputChange}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <Input fluid size='small' name='unit' placeholder='Unit' onChange={this.handleInputChange}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Icon title='Add attribute' link color='blue' size='large' name='plus circle' onClick={this.handleAddClick}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

AddAttributeComponent.propTypes = {
  onAddClick: PropTypes.func,
};
