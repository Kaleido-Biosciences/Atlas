import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Checkbox } from 'semantic-ui-react';

export class ComponentSelect extends Component {
  handleChange = (e, data) => {
    const { checked, value } = data;
    const selection = { componentType: this.props.type, components: [value] };
    if (checked) {
      this.props.onSelect(selection);
    } else {
      this.props.onDeselect(selection);
    }
  };
  renderFields(components) {
    return components.map((component, i) => {
      return (
        <Form.Field key={component}>
          <Checkbox
            label={component}
            value={component}
            onClick={this.handleChange}
            checked={this.props.selectedComponents.includes(component)}
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
  selectedComponents: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};
