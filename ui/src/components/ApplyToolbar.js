import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ComponentSelect } from './ComponentSelect';
import { createExperimentActions } from '../store/createExperiment';

class ApplyToolbar extends Component {
  handleComponentSelectChange = data => {
    this.props.setSelectedComponents(data);
  };
  render() {
    const { media } = this.props;
    return (
      <div>
        Apply Mode
        <ComponentSelect
          type="media"
          label="Media"
          components={media}
          onChange={this.handleComponentSelectChange}
        />
      </div>
    );
  }
}

ApplyToolbar.propTypes = {
  media: PropTypes.array.isRequired,
  setSelectedComponents: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  return {
    media: state.createExperiment.components.media,
  };
};

const connected = connect(
  mapState,
  { ...createExperimentActions }
)(ApplyToolbar);
export { connected as ApplyToolbar };
