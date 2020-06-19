import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import { EraserToolOption } from './EraserToolOption';
import styles from './EraserTool.module.css';

export class EraserTool extends Component {
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
  handleSelectAll = () => {
    const { componentTypes } = this.props;
    if (this.props.onChange) {
      this.props.onChange({
        componentTypesToClear: componentTypes.map((cType) => cType.name),
      });
    }
  };
  handleDeselectAll = () => {
    if (this.props.onChange) {
      this.props.onChange({
        componentTypesToClear: [],
      });
    }
  };
  renderFields() {
    const { componentTypes, componentTypesToClear } = this.props;
    return componentTypes.map((type) => {
      return (
        <Form.Field key={type.name}>
          <EraserToolOption
            componentType={type}
            checked={componentTypesToClear.includes(type.name)}
            onClick={this.handleChange}
          />
        </Form.Field>
      );
    });
  }
  render() {
    return (
      <div className={styles.eraserTool}>
        <div className={styles.message}>
          Select the component types to clear on click
        </div>
        <div className={styles.buttons}>
          <Button compact size="mini" onClick={this.handleSelectAll}>
            Select All
          </Button>
          <Button compact size="mini" onClick={this.handleDeselectAll}>
            Deselect All
          </Button>
        </div>
        <Form>{this.renderFields()}</Form>
      </div>
    );
  }
}

EraserTool.propTypes = {
  componentTypesToClear: PropTypes.array.isRequired,
  componentTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
