import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { createExperimentActions } from '../../store/createExperiment';
import { CommunitiesForm } from './CommunitiesForm';
import { CompoundsForm } from './CompoundsForm';
import { MediaForm } from './MediaForm';
import { groupComponents } from '../../util';

class ApplyToolbar extends Component {
  group = memoize(groupComponents);
  render() {
    const { components } = this.props;
    const { communities, compounds, media, supplements } = this.group(
      components
    );
    return (
      <div className="apply-toolbar">
        <CommunitiesForm
          communities={communities}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
          onConcentrationClick={this.props.onConcentrationClick}
          onConcentrationBlur={this.props.onConcentrationBlur}
          onConcentrationSave={this.props.onConcentrationSave}
        />
        <CompoundsForm
          compounds={compounds}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
          onConcentrationClick={this.props.onConcentrationClick}
          onConcentrationBlur={this.props.onConcentrationBlur}
          onConcentrationSave={this.props.onConcentrationSave}
        />
        <MediaForm
          media={media}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
        />
      </div>
    );
  }
}

ApplyToolbar.propTypes = {
  components: PropTypes.array.isRequired,
  onComponentSelect: PropTypes.func.isRequired,
  onComponentDeselect: PropTypes.func.isRequired,
  onConcentrationClick: PropTypes.func.isRequired,
  onConcentrationSave: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { components } = state.createExperiment;
  return {
    components,
  };
};

const mapDispatch = {
  onComponentSelect: createExperimentActions.selectComponents,
  onComponentDeselect: createExperimentActions.deselectComponents,
  onConcentrationClick: createExperimentActions.toggleComponentEditing,
  onConcentrationBlur: createExperimentActions.toggleComponentEditing,
  onConcentrationSave: createExperimentActions.setComponentConcentration,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
