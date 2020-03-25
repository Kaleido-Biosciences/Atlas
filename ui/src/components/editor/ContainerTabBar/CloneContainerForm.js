import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Button, Message } from 'semantic-ui-react';

import styles from './CloneContainerForm.module.css';

export class CloneContainerForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.componentTypes.reduce((state, type) => {
      state[type.name] = false;
      return state;
    }, {});
  }
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
  renderFields() {
    const { componentTypes } = this.props;
    return componentTypes.map(type => {
      return (
        <Form.Field key={`CLONE_${type.name}`}>
          <Checkbox
            value={type.name}
            label={type.plural}
            onClick={this.handleCheckboxClick}
            checked={this.state[type.name]}
          />
        </Form.Field>
      );
    });
  }
  render() {
    const selections = Object.entries(this.state);
    const selected = selections.find(option => {
      return option[1];
    });
    const buttonDisabled = selected ? false : true;
    return (
      <div>
        <Form>
          <Message size="tiny">
            Select the component types to copy to the new container.
          </Message>
          {this.renderFields()}
          <div className={styles.buttonContainer}>
            <Button
              className={styles.submitButton}
              disabled={buttonDisabled}
              primary
              onClick={this.handleSubmit}
            >
              Clone Container
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

CloneContainerForm.propTypes = {
  componentTypes: PropTypes.object,
  onSubmit: PropTypes.func,
};
