import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, TextArea, Button } from 'semantic-ui-react';
import styles from './ImportTextArea.module.css';

export class ImportTextArea extends Component {
  state = {
    componentNames: [],
  };
  handleChange = (e, data) => {
    this.setState({ componentNames: data.value.trim().split(/\r|\n/) });
    // this.setState({ searchTerms, found: [], notFound: [] });
  };
  handleImport = () => {
    if (this.props.onImport) {
      this.props.onImport({ componentNames: this.state.componentNames });
    }
  };
  render() {
    const { componentNames } = this.state;
    const count = componentNames.length;
    const buttonDisabled = count === 0;
    const buttonText =
      count > 0 ? `Import ${count} components` : 'Import components';
    return (
      <div>
        <Form>
          <div className={styles.container}>
            <TextArea
              placeholder="Enter components to import. Components should be newline separated."
              onChange={this.handleChange}
              className={styles.textArea}
            />
            <Button
              disabled={buttonDisabled}
              onClick={this.handleImport}
              className={styles.button}
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
  onImport: PropTypes.func,
};
