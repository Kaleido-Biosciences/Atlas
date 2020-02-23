import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import styles from './ContainerSize.module.css';

const renderInput = options => {
  return <Form.Input fluid type="text" {...options} />;
};

export class ContainerSizeForm extends Component {
  state = {
    rows: '',
    columns: '',
  };
  handleCustomChange = (e, { name, value }) => {
    let rows, columns;
    let parsed = parseInt(value);
    if (!parsed || isNaN(parsed)) {
      parsed = '';
    }
    if (name === 'rows') {
      if (value < 27) {
        this.setState({ rows: parsed });
        rows = parsed;
        columns = parseInt(this.state.columns);
        this.onChange({ rows, columns });
      }
    } else {
      this.setState({ columns: parsed });
      rows = parseInt(this.state.rows);
      columns = parsed;
      this.onChange({ rows, columns });
    }
  };
  onChange = dimensions => {
    if (this.props.onChange) {
      if (dimensions && dimensions.rows && dimensions.columns) {
        this.props.onChange({ dimensions });
      } else {
        this.props.onChange({ dimensions: null });
      }
    }
  };
  render() {
    const { rows, columns } = this.state;
    const wells = rows && columns ? rows * columns : null;
    const { units } = this.props;
    return (
      <div className={styles.container}>
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td />
              <td>
                <div className={styles.columns}>
                  {renderInput({
                    name: 'columns',
                    value: columns,
                    onChange: this.handleCustomChange,
                    placeholder: 'Columns',
                    tabIndex: '2',
                    className: styles.columnsInput,
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={styles.rows}>
                  {renderInput({
                    name: 'rows',
                    value: rows,
                    onChange: this.handleCustomChange,
                    placeholder: 'Rows',
                    tabIndex: '1',
                    autoFocus: true,
                    className: styles.rowInput,
                    max: '26',
                  })}
                </div>
              </td>
              <td>
                <div className={styles.rectangle}>
                  <div className={styles.containerCount}>
                    {wells ? `${wells} ${units}` : ''}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ContainerSizeForm.propTypes = {
  units: PropTypes.string,
  onChange: PropTypes.func,
};
