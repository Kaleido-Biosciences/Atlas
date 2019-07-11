import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';

import { ConcentrationInput } from './ConcentrationInput';

export class CompoundsForm extends Component {
  handleChange = (e, data) => {
    const { checked, value } = data;
    const compound = this.props.compounds.find(
      compound => compound.id === value
    );
    const selection = { components: [compound] };
    if (checked) {
      this.props.onSelect(selection);
    } else {
      this.props.onDeselect(selection);
    }
  };
  renderFields() {
    const { compounds } = this.props;
    return compounds.map((compound, i) => {
      return (
        <Form.Field key={i}>
          <Checkbox
            label={compound.displayName}
            value={compound.id}
            onClick={this.handleChange}
            checked={compound.selected}
          />
          <ConcentrationInput
            component={compound}
            onClick={this.props.onConcentrationClick}
            onBlur={this.props.onConcentrationBlur}
            onSave={this.props.onConcentrationSave}
          />
        </Form.Field>
      );
    });
  }
  render() {
    return (
      <div className="component-form">
        <Form>
          <label className="component-form-name">Compounds</label>
          <div className="component-form-fields-container">
            {this.renderFields()}
          </div>
        </Form>
      </div>
    );
  }
}

CompoundsForm.propTypes = {
  compounds: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onConcentrationClick: PropTypes.func.isRequired,
  onConcentrationBlur: PropTypes.func.isRequired,
  onConcentrationSave: PropTypes.func.isRequired,
};
