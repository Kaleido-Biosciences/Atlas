import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Checkbox } from 'semantic-ui-react';

export class ComponentSelect extends Component {
  selectedComponents = [];
  handleChange = (e, data) => {
    const { checked, value } = data;
    if (checked) {
      this.selectedComponents.push(value);
    } else {
      const index = this.selectedComponents.indexOf(value);
      this.selectedComponents.splice(index, 1);
    }
    this.props.onChange({
      type: this.props.type,
      selections: [...this.selectedComponents],
    });
  };
  renderFields(components) {
    return components.map((component, i) => {
      return (
        <Form.Field key={component}>
          <Checkbox
            label={component}
            value={component}
            onClick={this.handleChange}
          />
        </Form.Field>
      );
    });
  }
  render() {
    const { components, label } = this.props;
    return (
      <div className="component-select">
        <Form>
          <label className="component-select-type-label">{label}</label>
          <div className="component-select-fields-container">
            {this.renderFields(components)}
          </div>
        </Form>
      </div>
    );
  }
}

ComponentSelect.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  components: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
