import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Checkbox } from 'semantic-ui-react';

export class MediaForm extends Component {
  handleChange = (e, data) => {
    const { checked, value } = data;
    const medium = this.props.media.find(medium => medium.id === value);
    const selection = { components: [medium] };
    if (checked) {
      this.props.onSelect(selection);
    } else {
      this.props.onDeselect(selection);
    }
  };
  renderFields() {
    const { media } = this.props;
    return media.map((medium, i) => {
      return (
        <Form.Field key={i}>
          <Checkbox
            label={medium.displayName}
            value={medium.id}
            onClick={this.handleChange}
            checked={medium.selected}
          />
        </Form.Field>
      );
    });
  }
  render() {
    return (
      <div className="component-form">
        <Form>
          <label className="component-form-name">Media</label>
          <div className="component-form-fields-container">
            {this.renderFields()}
          </div>
        </Form>
      </div>
    );
  }
}

MediaForm.propTypes = {
  media: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};
