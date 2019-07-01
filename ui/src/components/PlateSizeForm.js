import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';

import styles from './PlateSizeForm.module.css';

const renderRadio = options => {
  const { stateValue, ...rest } = options;
  return (
    <Form.Field>
      <Radio name="plateSize" checked={stateValue === rest.value} {...rest} />
    </Form.Field>
  );
};

const renderInput = options => {
  return <Form.Input fluid type="number" {...options} />;
};

export class PlateSizeForm extends Component {
  constructor(props) {
    super(props);
    const { defaultDimensions: dimensions } = props;
    let value = '',
      rows = '',
      columns = '';
    if (dimensions && dimensions.rows && dimensions.columns) {
      if (dimensions.rows === 8 && dimensions.columns === 12) {
        value = '96';
      } else if (dimensions.rows === 16 && dimensions.columns === 24) {
        value = '384';
      } else {
        value = 'custom';
      }
      rows = dimensions.rows;
      columns = dimensions.columns;
    }
    this.state = { value, rows, columns };
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
    const { value, rows, columns } = this.state;
    const wells = rows && columns ? rows * columns : null;
    const showPlate = (rows && columns) || value === 'custom';
    return (
      <div>
        <div className={styles.radioContainer}>
          <Form>
            <Form.Group inline>
              {renderRadio({
                label: '96 wells',
                value: '96',
                onChange: this.handleChange,
                stateValue: value,
              })}
              {renderRadio({
                label: '384 wells',
                value: '384',
                onChange: this.handleChange,
                stateValue: value,
              })}
              {renderRadio({
                label: 'Custom size',
                value: 'custom',
                onChange: this.handleChange,
                stateValue: value,
              })}
            </Form.Group>
          </Form>
        </div>
        {showPlate ? (
          <div className={styles.plate}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td />
                  <td>
                    <div className={styles.columns}>
                      {value === 'custom' ? (
                        renderInput({
                          name: 'columns',
                          value: columns,
                          onChange: this.handleCustomChange,
                          placeholder: 'Columns',
                          tabIndex: '2',
                          className: styles.columnsInput,
                        })
                      ) : (
                        <div className={styles.columnsText}>
                          {columns ? `${columns} columns` : ''}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.rows}>
                      {value === 'custom' ? (
                        renderInput({
                          name: 'rows',
                          value: rows,
                          onChange: this.handleCustomChange,
                          placeholder: 'Rows',
                          tabIndex: '1',
                          autoFocus: true,
                          className: styles.rowInput,
                        })
                      ) : (
                        <div className={styles.rowText}>
                          {rows ? `${rows} rows` : ''}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {' '}
                    <div className={styles.rectangle}>
                      <div className={styles.wellCount}>
                        {wells ? `${wells} wells` : ''}
                      </div>
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
  defaultDimensions: PropTypes.object,
  onChange: PropTypes.func,
};
