import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';

import styles from './ClearTool.module.css';

export class ClearTool extends Component {
  handleChange = (e, data) => {
    if (this.props.onChange) {
      this.props.onChange({ clearMode: data.value });
    }
  };
  render() {
    return (
      <div className={styles.clearTool}>
        <Form>
          <Form.Field>
            <Checkbox
              radio
              label="All"
              name="clearRadioGroup"
              value="all"
              checked={this.props.clearMode === 'all'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Communities"
              name="clearRadioGroup"
              value="communities"
              checked={this.props.clearMode === 'communities'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Compounds"
              name="clearRadioGroup"
              value="compounds"
              checked={this.props.clearMode === 'compounds'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Media"
              name="clearRadioGroup"
              value="media"
              checked={this.props.clearMode === 'media'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Supplements"
              name="clearRadioGroup"
              value="supplements"
              checked={this.props.clearMode === 'supplements'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Attributes"
              name="clearRadioGroup"
              value="attributes"
              checked={this.props.clearMode === 'attributes'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

ClearTool.propTypes = {
  clearMode: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
