import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';

export class PlateSizeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      rows: '',
      columns: '',
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value, rows: '', columns: '' });
    if (value === '96') {
      this.onChange({ rows: 8, columns: 12 });
    } else if (value === '384') {
      this.onChange({ rows: 16, columns: 24 });
    }
  };

  handleCustomChange = (e, { name, value }) => {
    let rows, columns;
    if (name === 'rows') {
      this.setState({ rows: value });
      rows = value;
      columns = this.state.columns;
    } else {
      this.setState({ columns: value });
      rows = this.state.rows;
      columns = value;
    }
    this.onChange({ rows, columns });
  };

  onChange = dimensions => {
    if (this.props.onChange) {
      const parsedRows = parseInt(dimensions.rows);
      const parsedColumns = parseInt(dimensions.columns);
      if (parsedRows && parsedColumns) {
        const parsedDimensions = {
          rows: parsedRows,
          columns: parsedColumns,
        };
        this.props.onChange(parsedDimensions);
      }
    }
  };

  render() {
    const { rows, columns } = this.state;
    return (
      <div>
        <Form>
          <Form.Group inline>
            <Form.Field>
              <Radio
                label="96 wells"
                name="plateSize"
                value="96"
                onChange={this.handleChange}
                checked={this.state.value === '96'}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="384 wells"
                name="plateSize"
                value="384"
                onChange={this.handleChange}
                checked={this.state.value === '384'}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Custom size"
                name="plateSize"
                value="custom"
                onChange={this.handleChange}
                checked={this.state.value === 'custom'}
              />
            </Form.Field>
          </Form.Group>
          {this.state.value === 'custom' && (
            <Form.Group>
              <Form.Input
                label="Rows"
                name="rows"
                value={rows}
                type="number"
                onChange={this.handleCustomChange}
                placeholder="# of rows"
              />
              <Form.Input
                label="Columns"
                name="columns"
                value={columns}
                type="number"
                onChange={this.handleCustomChange}
                placeholder="# of columns"
              />
            </Form.Group>
          )}
        </Form>
      </div>
    );
  }
}

PlateSizeForm.propTypes = {
  onChange: PropTypes.func,
};
