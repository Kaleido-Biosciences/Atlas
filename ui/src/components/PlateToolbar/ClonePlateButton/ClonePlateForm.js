import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Button, Message } from 'semantic-ui-react';

import styles from './ClonePlateForm.module.css';

export class ClonePlateForm extends Component {
  state = {
    community: false,
    compound: false,
    medium: false,
    supplement: false,
  };
  handleCheckboxClick = (e, data) => {
    const { checked, value } = data;
    this.setState({
      [value]: checked,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) {
      const entries = Object.entries(this.state);
      const selections = [];
      entries.forEach(selection => {
        if (selection[1]) {
          selections.push(selection[0]);
        }
      });
      this.props.onSubmit({ typesToClone: selections });
    }
  };
  render() {
    const { community, compound, medium, supplement } = this.state;
    const atLeastOneChecked = community || compound || medium || supplement;
    return (
      <div>
        <Form>
          <Message size="tiny">
            Select the component types to copy to the new plate.
          </Message>
          <Form.Field>
            <Checkbox
              value="community"
              label="Communities"
              onClick={this.handleCheckboxClick}
              checked={this.state.community}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              value="compound"
              label="Compounds"
              onClick={this.handleCheckboxClick}
              checked={this.state.compound}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              value="medium"
              label="Media"
              onClick={this.handleCheckboxClick}
              checked={this.state.medium}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              value="supplement"
              label="Supplements"
              onClick={this.handleCheckboxClick}
              checked={this.state.supplement}
            />
          </Form.Field>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.submitButton}
              disabled={!atLeastOneChecked}
              primary
              onClick={this.handleSubmit}
            >
              Clone Plate
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

ClonePlateForm.propTypes = {
  onSubmit: PropTypes.func,
};
