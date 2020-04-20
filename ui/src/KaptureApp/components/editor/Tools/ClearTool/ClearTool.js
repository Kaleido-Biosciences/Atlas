import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Message } from 'semantic-ui-react';

import styles from './ClearTool.module.css';

export class ClearTool extends Component {
  handleChange = (e, data) => {
    const { checked, value } = data;
    if (this.props.onChange) {
      const newValues = this.props.componentTypesToClear.slice();
      if (checked) {
        newValues.push(value);
      } else {
        const index = newValues.findIndex((type) => {
          return type === value;
        });
        if (index > -1) {
          newValues.splice(index, 1);
        }
      }
      this.props.onChange({ componentTypesToClear: newValues });
    }
  };
  renderFields() {
    const { componentTypes, componentTypesToClear } = this.props;
    return componentTypes.map((type) => {
      return (
        <Form.Field key={type.name}>
          <Checkbox
            value={type.name}
            label={type.plural}
            onClick={this.handleChange}
            checked={componentTypesToClear.includes(type.name)}
          />
        </Form.Field>
      );
    });
  }
  render() {
    return (
      <div className={styles.clearTool}>
        <Message size="tiny">
          Select the component types to clear on click.
        </Message>
        <Form>{this.renderFields()}</Form>
      </div>
    );
  }
}

ClearTool.propTypes = {
  componentTypesToClear: PropTypes.array.isRequired,
  componentTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
