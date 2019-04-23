import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ComponentSelect } from './ComponentSelect';

class ApplyToolbar extends Component {
  handleComponentSelectChange = data => {
    const { type, selections } = data;
    console.log(type, selections);
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
};

const mapState = (state, props) => {
  return {
    media: state.createExperiment.components.media,
  };
};

const connected = connect(mapState)(ApplyToolbar);
export { connected as ApplyToolbar };
