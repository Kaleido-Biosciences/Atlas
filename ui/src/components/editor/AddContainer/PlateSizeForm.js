import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { ContainerSize } from './ContainerSize';
import { ContainerSizeForm } from './ContainerSizeForm';
import styles from './AddContainer.module.css';

export class PlateSizeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { radioOption: '96', dimensions: { rows: 8, columns: 12 } };
    this.onChange({ dimensions: { rows: 8, columns: 12 } });
  }
  handleRadioOptionChange = (e, { value }) => {
    if (value === '96') {
      this.setState({
        radioOption: value,
        dimensions: { rows: 8, columns: 12 },
      });
      this.onChange({ dimensions: { rows: 8, columns: 12 } });
    } else if (value === '384') {
      this.setState({
        radioOption: value,
        dimensions: { rows: 16, columns: 24 },
      });
      this.onChange({ dimensions: { rows: 16, columns: 24 } });
    } else if (value === 'custom') {
      this.setState({
        radioOption: value,
        dimensions: { rows: '', columns: '' },
      });
      this.onChange({ dimensions: null });
    }
  };
  onChange = ({ dimensions }) => {
    if (this.props.onChange) {
      this.props.onChange({ containerGrid: { dimensions, type: 'Plate' } });
    }
  };
  render() {
    const { radioOption, dimensions } = this.state;
    let showForm = radioOption === 'custom';
    return (
      <div>
        <Form>
          <Form.Group inline>
            <label className={styles.radioLabel}>Select a plate size:</label>
            <Form.Radio
              label="96 wells"
              name="radioOption"
              value="96"
              checked={this.state.radioOption === '96'}
              onChange={this.handleRadioOptionChange}
            />
            <Form.Radio
              label="384 wells"
              name="radioOption"
              value="384"
              checked={this.state.radioOption === '384'}
              onChange={this.handleRadioOptionChange}
            />
            <Form.Radio
              label="Custom"
              name="radioOption"
              value="custom"
              checked={this.state.radioOption === 'custom'}
              onChange={this.handleRadioOptionChange}
            />
          </Form.Group>
        </Form>
        {showForm ? (
          <ContainerSizeForm units={'wells'} onChange={this.onChange} />
        ) : (
          <ContainerSize dimensions={dimensions} units={'wells'} />
        )}
      </div>
    );
  }
}

PlateSizeForm.propTypes = {
  onChange: PropTypes.func,
};
