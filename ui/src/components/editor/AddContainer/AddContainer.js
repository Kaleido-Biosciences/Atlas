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
  };
  handleRadioOptionChange = (e, data) => {
    this.setState({ radioOption: data.value });
  };
  handleContainerGridChange = ({ containerGrid }) => {
    if (this.props.onChange) {
      const { type, dimensions } = containerGrid;
      if (type && dimensions && dimensions.rows && dimensions.columns) {
        this.props.onChange({
          containerGrid: {
            type,
            dimensions,
          },
        });
      } else {
        this.props.onChange({ containerGrid: null });
      }
    }
  };
  handleContainerChange = ({ container }) => {
    if (this.props.onChange) {
      const { type } = container;
      if (type) {
        this.props.onChange({
          container: {
            type,
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
            <PlateSizeForm onChange={this.handleContainerGridChange} />
          )}
          {radioOption === 'rack' && (
            <RackSizeForm onChange={this.handleContainerGridChange} />
          )}
          {radioOption === 'other' && (
            <SingleContainerForm onChange={this.handleContainerChange} />
          )}
        </div>
      </div>
    );
  }
}

AddContainer.propTypes = {
  onChange: PropTypes.func,
};
