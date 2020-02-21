import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';

export class AddContainerForm extends Component {
  state = {
    containerType: 'plate',
  };
  handleChange = (e, data) => {
    this.setState({ containerType: data.value });
  };
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Checkbox
              radio
              label="Plate"
              name="containerGroup"
              value="plate"
              checked={this.state.containerType === 'plate'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Rack"
              name="containerGroup"
              value="rack"
              checked={this.state.containerType === 'rack'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Tube"
              name="containerGroup"
              value="tube"
              checked={this.state.containerType === 'tube'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

AddContainerForm.propTypes = {};
