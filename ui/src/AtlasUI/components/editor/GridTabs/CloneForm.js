import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Button, Input } from 'semantic-ui-react';

import styles from './CloneForm.module.css';

export class CloneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelections: [],
      quantity: 1,
    };
  }
  handleCheckboxClick = (e, { checked, value }) => {
    let typeSelections;
    if (checked) {
      typeSelections = this.state.typeSelections.slice();
      typeSelections.push(value);
    } else {
      typeSelections = this.state.typeSelections.filter((selection) => {
        return selection !== value;
      });
    }
    this.setState({
      typeSelections,
    });
  };
  handleSelectAll = () => {
    const { componentTypes } = this.props;
    this.setState({
      typeSelections: componentTypes.map((type) => {
        return type.name;
      }),
    });
  };
  handleQuantityChange = (e, { value }) => {
    if (value) this.setState({ quantity: parseInt(value) });
    else this.setState({ quantity: '' });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      const selections = this.state.typeSelections.slice();
      this.props.onSubmit(selections, this.state.quantity);
    }
  };
  checkStateValid = () => {
    return (
      this.state.typeSelections.length > 0 &&
      this.state.quantity &&
      this.state.quantity >= 1 &&
      Number.isInteger(this.state.quantity)
    );
  };
  renderFields() {
    const { componentTypes } = this.props;
    const { typeSelections } = this.state;
    return componentTypes.map((type) => {
      return (
        <Form.Field key={`CLONE_${type.name}`}>
          <Checkbox
            value={type.name}
            label={type.plural}
            onClick={this.handleCheckboxClick}
            checked={typeSelections.includes(type.name)}
          />
        </Form.Field>
      );
    });
  }
  render() {
    const buttonDisabled = !this.checkStateValid();
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Component types to copy</label>
            <Button
              compact
              className={styles.selectAllButton}
              size="mini"
              onClick={this.handleSelectAll}
            >
              Select All
            </Button>
          </Form.Field>
          {this.renderFields()}
          <div>
            <Form.Field>
              <label>Quantity</label>
              <Input
                onChange={this.handleQuantityChange}
                value={this.state.quantity}
                type="number"
              />
            </Form.Field>
          </div>
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

CloneForm.propTypes = {
  componentTypes: PropTypes.array,
  onSubmit: PropTypes.func,
};
