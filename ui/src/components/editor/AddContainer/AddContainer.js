import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { PlateSizeForm } from './PlateSizeForm';
import { RackSizeForm } from './RackSizeForm';
import { SingleContainerForm } from './SingleContainerForm';
import styles from './AddContainer.module.css';

export class AddContainer extends Component {
  state = {
    radioOption: 'plate',
    containerType: 'Plate',
    dimensions: { rows: 8, columns: 12 },
  };
  handleRadioOptionChange = (e, data) => {
    this.setState({ radioOption: data.value });
  };
  handleFormChange = ({ dimensions, containerType }) => {
    this.setState({ dimensions, containerType });
    if (this.props.onChange) {
      if (
        containerType &&
        dimensions &&
        dimensions.rows &&
        dimensions.columns
      ) {
        this.props.onChange({
          container: {
            type: containerType,
            dimensions,
          },
        });
      } else {
        this.props.onChange({ container: null });
      }
    }
  };
  render() {
    const { radioOption } = this.state;
    return (
      <div>
        <Form>
          <Form.Group inline>
            <label className={styles.radioLabel}>
              Select a container type:
            </label>
            <Form.Radio
              label="Plate"
              name="radioOption"
              value="plate"
              checked={this.state.radioOption === 'plate'}
              onChange={this.handleRadioOptionChange}
            />
            <Form.Radio
              label="Rack"
              name="radioOption"
              value="rack"
              checked={this.state.radioOption === 'rack'}
              onChange={this.handleRadioOptionChange}
            />
            <Form.Radio
              label="Other"
              name="radioOption"
              value="other"
              checked={this.state.radioOption === 'other'}
              onChange={this.handleRadioOptionChange}
            />
          </Form.Group>
        </Form>
        <div>
          {radioOption === 'plate' && (
            <PlateSizeForm onChange={this.handleFormChange} />
          )}
          {radioOption === 'rack' && (
            <RackSizeForm onChange={this.handleFormChange} />
          )}
          {radioOption === 'other' && (
            <SingleContainerForm onChange={this.handleFormChange} />
          )}
        </div>
      </div>
    );
  }
}

AddContainer.propTypes = {
  onChange: PropTypes.func,
};
