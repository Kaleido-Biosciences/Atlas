import React, { Component } from 'react';
import { Grid, Icon, Form, Segment, Select, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export class AddAttributeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      value: '',
      value_type: this.props.defaultValueType,
      value_unit: '',
      errorMessage: null,
    };
  }

  setKey = (event, data) => {
    this.setState({ key: data.value });
    event.preventDefault();
  };

  changeValueType = (event, data) => {
    this.setState({ value_type: data.value, value:'', value_unit:''});
    event.preventDefault();
  };

  setValueSelection = (event, data) => {
    this.setState({ value: data.value });
    event.preventDefault();
  };

  setValue = (event, data) => {
    const { value_type } = this.state;
    if (value_type === 'Integer' && Number.isNaN(parseInt(data.value))){
      this.setState({ errorMessage: 'Value is not an integer.'});
      this.setState({value: ''})
    }
    else if (value_type === 'Float' && Number.isNaN(parseFloat(data.value))){
      this.setState({ errorMessage: 'Value is not numeric.'});
      this.setState({value: ''})
    }
    else {
      this.setState({ value: data.value });
      this.setState({ errorMessage: null});
    }
    event.preventDefault();
  };

  setValueUnit = (event, data) => {
    this.setState({ value_unit: data.value });
    event.preventDefault();
  };

  renderMessage = () => {
    const { errorMessage } = this.state;
    return (errorMessage? <Message error content={errorMessage} /> : '');
  };

  handleAddClick = (event) => {
    const { key, value, value_type, value_unit } = this.state;
    let id = value ? (key + '_' + value).replace(/ /g, '_') : key;
    let unit = value ? (value_unit ? value_unit : '' ): '';
    let displayName = value ? key + "(" + value + unit + ")" : key;
    let component = {
      id: 'ATTRIBUTE_' + id,
      type: "attribute",
      displayName: displayName,
      isValid: true,
      selected: true,
      data: { id: id, name: displayName, key: key, value: value, value_type: value_type, value_unit: value_unit }
    };
    this.props.onAddClick({ component });
    this.setState({ key: '', value: '', value_type: this.props.defaultValueType, value_unit: '' });
    event.preventDefault();
  };

  renderOtherInput = () => {
    const {key, value_type} = this.state;
    if (key && key.length > 0 && value_type) {
      return (
        <Grid.Row>
          {this.renderValueComponent()}
          {this.renderValueUnitComponent()}
          {this.renderAddIcon()}
        </Grid.Row>
      );
    } else {
      return "";
    }
  };

  renderAddIcon = () => {
    const {key, value, value_type} = this.state;
    if (value_type && value && key){
      return (
        <Grid.Column width={4}>
          <Icon title='Add Attribute' link color='blue' size='large' name='plus circle'
                onClick={this.handleAddClick}/>
        </Grid.Column>
      )
    }
  };

  renderValueUnitComponent = () => {
    const {value_type, value_unit} = this.state;
    if (value_type !== 'Boolean'){
      return (
        <Grid.Column width={6}>
          <Form.Input fluid size='small' title='value_unit' placeholder='Unit' value={value_unit} onChange={this.setValueUnit}/>
        </Grid.Column>
      )
    }
  };

  renderValueComponent = () => {
    const { value, value_type } = this.state;
    const booleanOptions = [
      { key: 'True',  value: 'True', text: 'True'},
      { key: 'False', value: 'False', text: 'False'},
    ];
    if (value_type === 'Boolean'){
      return (
        <Grid.Column width={10}>
          <Form.Select fluid
                  placeholder='Value'
                  onChange={this.setValueSelection}
                  options={booleanOptions}
                  value={value}
          />
        </Grid.Column>
      )
    }
    else{
      return(
        <Grid.Column width={6}>
          <Form.Input fluid size='small' title='value' placeholder='Value' value={value} onChange={this.setValue}/>
        </Grid.Column>
      )
    }
  };

  render() {
    const typeOptions = [
      { text: 'Decimal', value: 'Float', key: 'Float'},
      { text: 'Integer', value: 'Integer', key: 'Integer'},
      { text: 'Text', value: 'String', key: 'String'},
      { text: 'True/False',  value: 'Boolean', key: 'Boolean'},
    ];
    const { key, value_type} = this.state;
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Form.Input fluid size='small' title='key' placeholder='Name' value={key} onChange={this.setKey} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Form.Select
                fluid
                placeholder='Value Type'
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
  defaultValueType: PropTypes.string,
};
