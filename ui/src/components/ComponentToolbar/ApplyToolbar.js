import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import { Header, Button } from 'semantic-ui-react';
import SplitPane from 'react-split-pane';

import {
  applySelectedComponentsToSelectedWells,
  addComponentToComponents,
} from '../../store/experimentActions';
import {
  selectActivePlate,
  selectSelectedWellsFromActivePlate,
} from '../../store/selectors';
import { ComponentList } from './ComponentList';
import { CommunitiesSection } from './sections/CommunitiesSection';
import { CompoundsSection } from './sections/CompoundsSection';
import { MediaSection } from './sections/MediaSection';
import { SupplementsSection } from './sections/SupplementsSection';
import { groupComponents } from '../../util';
import styles from './ApplyToolbar.module.css';

class ApplyToolbar extends Component {
  groupComponents = memoize(groupComponents);
  handleApplyClick = () => {
    const { activePlate } = this.props;
    this.props.onApplyClick({ plateId: activePlate.id });
  };
  renderSelectedWells() {
    const { selectedWells } = this.props;
    if (selectedWells) {
      let wellString = null,
        headerText;
      if (selectedWells.length > 0) {
        const wellNames = selectedWells.map(well => well.name);
        wellString = wellNames.join(', ');
        headerText = 'Selected Wells:';
      } else {
        headerText = 'No wells selected.';
      }
      return (
        <div className={styles.selectedWells}>
          <Header size="tiny">{headerText}</Header>
          {wellString}
        </div>
      );
    }
  }
  render() {
    const {
      components,
      componentList,
      componentsValid,
      selectedWells,
      onComponentListClick,
    } = this.props;
    const groupedComponents = this.groupComponents(components);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showComponents = components.length > 0;
    const showSelectedWells = selectedWells && selectedWells.length > 0;
    const splitStyle = showSelectedWells
      ? {
          position: 'relative',
          height: 'calc(100% - 7em)',
        }
      : { position: 'relative' };
    return (
      <div className={styles.applyToolbar}>
        <SplitPane
          split="horizontal"
          style={splitStyle}
          pane1Style={{ marginBottom: '0.4em' }}
          pane2Style={{ marginTop: '0.4em', overflow: 'auto' }}
        >
          <div className={styles.componentListContainer}>
            <ComponentList
              components={componentList}
              onClick={onComponentListClick}
            />
          </div>
          <div className={styles.componentsContainer}>
            {showComponents ? (
              <React.Fragment>
                {communities.length > 0 && (
                  <CommunitiesSection communities={communities} />
                )}
                {compounds.length > 0 && (
                  <CompoundsSection compounds={compounds} />
                )}
                {media.length > 0 && <MediaSection media={media} />}
                {supplements.length > 0 && (
                  <SupplementsSection supplements={supplements} />
                )}
              </React.Fragment>
            ) : (
              <div className={styles.noComponentsMessage}>
                Get started by searching for some components above.
              </div>
            )}
          </div>
        </SplitPane>
        {selectedWells && selectedWells.length > 0 ? (
          <div className={styles.selectedWellsContainer}>
            {this.renderSelectedWells()}
            {showComponents ? (
              <div className={styles.applyButtonContainer}>
                <Button
                  disabled={!componentsValid}
                  primary
                  onClick={this.handleApplyClick}
                >
                  Apply to {selectedWells.length} wells
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

ApplyToolbar.propTypes = {
  components: PropTypes.array.isRequired,
  componentsValid: PropTypes.bool.isRequired,
  selectedWells: PropTypes.array.isRequired,
  activePlate: PropTypes.object,
  onApplyClick: PropTypes.func,
  onComponentListClick: PropTypes.func,
};

const mapState = (state, props) => {
  const { components, componentList, componentsValid } = state.designExperiment;
  const selectedWells = selectSelectedWellsFromActivePlate(state);
  const activePlate = selectActivePlate(state);
  return {
    components,
    componentList,
    componentsValid,
    selectedWells,
    activePlate,
  };
};

const mapDispatch = {
  onApplyClick: applySelectedComponentsToSelectedWells,
  onComponentListClick: addComponentToComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
