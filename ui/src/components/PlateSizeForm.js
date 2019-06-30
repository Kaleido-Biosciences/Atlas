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
    if (value === '96') {
      this.setState({ value, rows: 8, columns: 12 });
      this.onChange({ rows: 8, columns: 12 });
    } else if (value === '384') {
      this.setState({ value, rows: 16, columns: 24 });
      this.onChange({ rows: 16, columns: 24 });
    } else if (value === 'custom') {
      this.setState({ value, rows: '', columns: '' });
      this.onChange(null);
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
      if (dimensions) {
        const parsedRows = parseInt(dimensions.rows);
        const parsedColumns = parseInt(dimensions.columns);
        if (parsedRows && parsedColumns) {
          const parsedDimensions = {
            rows: parsedRows,
            columns: parsedColumns,
          };
          this.props.onChange(parsedDimensions);
        } else {
          this.props.onChange(null);
        }
      } else {
        this.props.onChange(null);
      }
    }
  };

  render() {
    const { rows, columns } = this.state;
    let wells;
    if (rows && columns) {
      wells = rows * columns;
    }
    const showPlate = (rows && columns) || this.state.value === 'custom';

    return (
      <div className="plate-size-form">
        <div className="plate-size-form-radios">
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
          </Form>
        </div>
        {showPlate ? (
          <div className="plate-size-form-plate">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td />
                  <td>
                    <div className="plate-size-form-plate-columns">
                      {this.state.value === 'custom' ? (
                        <Form.Input
                          fluid
                          name="columns"
                          value={columns}
                          type="number"
                          onChange={this.handleCustomChange}
                          placeholder="Columns"
                          className="plate-size-form-plate-columns-input"
                          tabIndex="2"
                        />
                      ) : (
                        <div className="plate-size-form-plate-columns-text">
                          {columns ? `${columns} columns` : ''}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="plate-size-form-plate-rows">
                      {this.state.value === 'custom' ? (
                        <Form.Input
                          fluid
                          name="rows"
                          value={rows}
                          type="number"
                          onChange={this.handleCustomChange}
                          placeholder="Rows"
                          tabIndex="1"
                          autoFocus
                          className="plate-size-form-row-input"
                        />
                      ) : (
                        <div className="plate-size-form-row-text">{rows ? `${rows} rows` : ''}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    {' '}
                    <div className="plate">
                      <div>{wells ? `${wells} wells` : ''}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

PlateSizeForm.propTypes = {
  onChange: PropTypes.func,
};
