import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';

import { ConcentrationInput } from './ConcentrationInput';

export class CommunitiesForm extends Component {
  handleChange = (e, data) => {
    const { checked, value } = data;
    const community = this.props.communities.find(
      community => community.id === value
    );
    const selection = { components: [community] };
    if (checked) {
      this.props.onSelect(selection);
    } else {
      this.props.onDeselect(selection);
    }
  };
  renderFields() {
    const { communities } = this.props;
    return communities.map((community, i) => {
      return (
        <Form.Field key={i}>
          <Checkbox
            label={community.displayName}
            value={community.id}
            onClick={this.handleChange}
            checked={community.selected}
          />
          <ConcentrationInput
            component={community}
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
          <label className="component-form-name">Communities</label>
          <div className="component-form-fields-container">
            {this.renderFields()}
          </div>
        </Form>
      </div>
    );
  }
}

CommunitiesForm.propTypes = {
  communities: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onConcentrationClick: PropTypes.func.isRequired,
  onConcentrationBlur: PropTypes.func.isRequired,
  onConcentrationSave: PropTypes.func.isRequired,
};
