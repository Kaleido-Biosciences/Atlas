import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Select } from 'semantic-ui-react';

export class ErrorRow extends Component {
  constructor(props) {
    super(props);
    let value = '';
    if (props.options.length === 1) {
      value = props.options[0].value;
    }
    this.state = {
      value,
    };
  }
  handleOptionChange = (e, { value }) => {
    this.setState({ value });
  };
  handleFix = () => {
    const { row, column } = this.props.error;
    this.props.onFixClick(row, column, this.state.value);
  };
  handleFixAll = () => {
    const { row, column } = this.props.error;
    this.props.onFixAllClick(row, column, this.state.value);
  };
  render() {
    const { error, options } = this.props;
    const { value } = this.state;
    const position = `${error.row}${error.column}`;
    return (
      <tr>
        <td>{position}</td>
        <td>{error.component}</td>
        <td>
          <Select
            value={value}
            options={options}
            onChange={this.handleOptionChange}
            placeholder="Select component"
            selectOnBlur={false}
          />
        </td>
        <td>
          <Button onClick={this.handleFix} disabled={!value} size="mini">
            Fix
          </Button>
          <Button
            onClick={this.handleFixAll}
            disabled={!value}
            size="mini"
          >{`Fix all ${error.component}`}</Button>
        </td>
      </tr>
    );
  }
}

ErrorRow.propTypes = {
  error: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onFixClick: PropTypes.func,
  onFixAllClick: PropTypes.func,
};
