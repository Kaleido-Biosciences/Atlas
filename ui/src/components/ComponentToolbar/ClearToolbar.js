import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Checkbox } from 'semantic-ui-react';

import { createExperimentActions } from '../../store/createExperiment';

class ClearToolbar extends Component {
  handleChange = (e, data) => {
    this.props.onChange(data.value);
  };
  render() {
    return (
      <div>
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
        </Form>
      </div>
    );
  }
}

ClearToolbar.propTypes = {
  clearMode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  return { clearMode: state.createExperiment.clearMode };
};

const connected = connect(
  mapState,
  { onChange: createExperimentActions.setClearMode }
)(ClearToolbar);
export { connected as ClearToolbar };
