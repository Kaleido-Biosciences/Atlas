import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { ContainerSize } from './ContainerSize';
import { ContainerSizeForm } from './ContainerSizeForm';

export class RackSizeForm extends Component {
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
      this.props.onChange({ dimensions });
    }
  };
  render() {
    const { radioOption, dimensions } = this.state;
    let showForm = radioOption === 'custom';
    return (
      <div>
        <Form>
          <Form.Group inline>
            <label>Select a rack size:</label>
            <Form.Radio
              label="96 tubes"
              name="radioOption"
              value="96"
              checked={this.state.radioOption === '96'}
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
