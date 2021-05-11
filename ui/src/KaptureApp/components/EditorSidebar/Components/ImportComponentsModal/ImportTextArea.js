import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea, Button } from 'semantic-ui-react';

import styles from './ImportComponentsModal.module.css';

export class ImportTextArea extends Component {
  handleChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };
  handleImportClick = (e) => {
    e.preventDefault();
    if (this.props.onImportClick) {
      this.props.onImportClick();
    }
  };
  render() {
    const { value, componentNameCount: count } = this.props;
    const buttonDisabled = count === 0;
    const buttonText =
      count > 0 ? `Import ${count} components` : 'Import components';
    return (
      <div>
        <Form>
          <div className={styles.textAreaContainer}>
            <TextArea
              placeholder="Enter components to import. Components should be newline separated."
              value={value}
              onChange={this.handleChange}
              className={styles.textArea}
            />
            <Button
              disabled={buttonDisabled}
              onClick={this.handleImportClick}
              className={styles.importButton}
            >
              {buttonText}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

ImportTextArea.propTypes = {
  value: PropTypes.string,
  componentNameCount: PropTypes.number,
  onChange: PropTypes.func,
  onImportClick: PropTypes.func,
};
