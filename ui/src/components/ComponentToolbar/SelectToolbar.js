import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import {
  createExperimentActions,
  selectActivePlateMap,
  selectSelectedWellsFromActivePlateMap,
} from '../../store/createExperiment';
import { CommunitiesForm } from './CommunitiesForm';
import { CompoundsForm } from './CompoundsForm';
import { MediaForm } from './MediaForm';

class SelectToolbar extends Component {
  handleApplyClick = () => {
    const { activePlateMap } = this.props;
    this.props.onApplyClick({ plateMapId: activePlateMap.id });
  };
  renderSelectedWells() {
    const { selectedWells } = this.props;
    if (selectedWells) {
      if (selectedWells.length > 0) {
        const wellNames = selectedWells.map(well => well.name);
        const wellString = wellNames.join(', ');
        return (
          <div className="selected-wells-container">
            <Header size="tiny">Selected Wells</Header>
            {wellString}
          </div>
        );
      } else {
        return (
          <div className="selected-wells-container">
            <Header size="tiny">No wells selected</Header>
          </div>
        );
      }
    }
  }
  render() {
    const {
      activePlateMap,
      selectedWells,
      communities,
      compounds,
      media,
    } = this.props;
    return (
      <React.Fragment>
        {activePlateMap ? (
          <div className="select-toolbar">
            {this.renderSelectedWells()}
            <div>
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
            <div className="button-container">
              {selectedWells && selectedWells.length > 0 ? (
                <Button primary onClick={this.handleApplyClick}>
                  Apply to {selectedWells.length} wells
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

SelectToolbar.propTypes = {
  activePlateMap: PropTypes.object,
  selectedWells: PropTypes.array,
  communities: PropTypes.array.isRequired,
  compounds: PropTypes.array.isRequired,
  media: PropTypes.array.isRequired,
  onApplyClick: PropTypes.func.isRequired,
  onComponentSelect: PropTypes.func.isRequired,
  onComponentDeselect: PropTypes.func.isRequired,
  onConcentrationClick: PropTypes.func.isRequired,
  onConcentrationBlur: PropTypes.func.isRequired,
  onConcentrationSave: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const activePlateMap = selectActivePlateMap(state);
  const selectedWells = selectSelectedWellsFromActivePlateMap(state);
  const { selectedComponents } = state.createExperiment;
  return {
    activePlateMap,
    selectedWells,
    communities: selectedComponents.communities,
    compounds: selectedComponents.compounds,
    media: selectedComponents.media,
  };
};

const mapDispatch = {
  onApplyClick: createExperimentActions.applySelectedComponentsToSelectedWells,
  onComponentSelect: createExperimentActions.selectComponents,
  onComponentDeselect: createExperimentActions.deselectComponents,
  onConcentrationClick: createExperimentActions.toggleComponentEditing,
  onConcentrationBlur: createExperimentActions.toggleComponentEditing,
  onConcentrationSave: createExperimentActions.setComponentConcentration,
};

const connected = connect(
  mapState,
  mapDispatch
)(SelectToolbar);
export { connected as SelectToolbar };
