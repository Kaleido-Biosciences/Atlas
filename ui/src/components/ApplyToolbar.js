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
    const { communities, compounds, media } = this.props;
    return (
      <div className="apply-toolbar">
        <ComponentSelect
          type="communities"
          label="Communities"
          components={communities}
          onChange={this.handleComponentSelectChange}
        />
        <ComponentSelect
          type="compounds"
          label="Compounds"
          components={compounds}
          onChange={this.handleComponentSelectChange}
        />
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
  communities: PropTypes.array.isRequired,
  compounds: PropTypes.array.isRequired,
  media: PropTypes.array.isRequired,
  setSelectedComponents: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  return {
    communities: state.createExperiment.components.communities,
    compounds: state.createExperiment.components.compounds,
    media: state.createExperiment.components.media,
  };
};

const connected = connect(
  mapState,
  { ...createExperimentActions }
)(ApplyToolbar);
export { connected as ApplyToolbar };
