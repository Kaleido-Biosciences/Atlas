import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { ContainerSize } from './ContainerSize';
import { ContainerSizeForm } from './ContainerSizeForm';
import styles from './AddContainer.module.css';

export class RackSizeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { radioOption: '36', dimensions: { rows: 6, columns: 6 } };
    this.onChange({ dimensions: { rows: 6, columns: 6 } });
  }
  handleRadioOptionChange = (e, { value }) => {
    if (value === '36') {
      this.setState({
        radioOption: value,
        dimensions: { rows: 6, columns: 6 },
      });
      this.onChange({ dimensions: { rows: 6, columns: 6 } });
    } else if (value === '72') {
      this.setState({
        radioOption: value,
        dimensions: { rows: 6, columns: 12 },
      });
      this.onChange({ dimensions: { rows: 6, columns: 12 } });
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
      this.props.onChange({ dimensions, containerType: 'Rack' });
    }
  };
  render() {
    const { radioOption, dimensions } = this.state;
    let showForm = radioOption === 'custom';
    return (
      <div>
        <Form>
          <Form.Group inline>
            <label className={styles.radioLabel}>Select a rack size:</label>
            <Form.Radio
              label="36 tubes"
              name="radioOption"
              value="36"
              checked={this.state.radioOption === '36'}
              onChange={this.handleRadioOptionChange}
            />
            <Form.Radio
              label="72 tubes"
              name="radioOption"
              value="72"
              checked={this.state.radioOption === '72'}
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
          <ContainerSizeForm units={'tubes'} onChange={this.onChange} />
        ) : (
          <ContainerSize dimensions={dimensions} units={'tubes'} />
        )}
      </div>
    );
  }
}

RackSizeForm.propTypes = {
  onChange: PropTypes.func,
};
