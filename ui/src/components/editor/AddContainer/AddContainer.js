import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

export class AddContainer extends Component {
  state = {
    containerType: 'plate',
    dimensions: { rows: 8, columns: 12 },
  };
  handleContainerTypeChange = (e, data) => {
    this.setState({ containerType: data.value });
  };
  handleDimensionsChange = ({ dimensions }) => {
    this.setState({ dimensions });
  };
  handleSubmit = () => {
    console.log(this.state);
  };
  render() {
    const { containerType } = this.state;
    return (
      <div>
        <Form>
          <Form.Group inline>
            <label>Select a container type: </label>
            <Form.Radio
              label="Plate"
              name="containerType"
              value="plate"
              checked={this.state.containerType === 'plate'}
              onChange={this.handleContainerTypeChange}
            />
            <Form.Radio
              label="Rack"
              name="containerType"
              value="rack"
              checked={this.state.containerType === 'rack'}
              onChange={this.handleContainerTypeChange}
            />
            <Form.Radio
              label="Tube"
              name="containerType"
              value="tube"
              checked={this.state.containerType === 'tube'}
              onChange={this.handleContainerTypeChange}
            />
          </Form.Group>
        </Form>
        <div>
          {containerType === 'plate' && <div>Plate</div>}
          {containerType === 'rack' && <div>Rack</div>}
          {containerType === 'tube' && <div>tube</div>}
        </div>
        <div>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </div>
      </div>
    );
  }
}

AddContainer.propTypes = {
  onSubmit: PropTypes.func,
};
