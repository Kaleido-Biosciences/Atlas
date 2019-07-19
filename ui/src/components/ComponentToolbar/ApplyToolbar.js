import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'memoize-one';

import { createExperimentActions } from '../../store/createExperiment';
import { ComponentSearch } from './ComponentSearch';
import { CommunitiesSection } from './sections/CommunitiesSection';
import { CompoundsSection } from './sections/CompoundsSection';
import { MediaSection } from './sections/MediaSection';
import { SupplementsSection } from './sections/SupplementsSection';
import { groupComponents } from '../../util';
import styles from './ApplyToolbar.module.css';

class ApplyToolbar extends Component {
  groupComponents = memoize(groupComponents);
  render() {
    const { components, onAddComponent } = this.props;
    const groupedComponents = this.groupComponents(components);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showMessage = components.length === 0;
    return (
      <div className="apply-toolbar">
        <div className={styles.componentSearchContainer}>
          <ComponentSearch onSelect={onAddComponent} />
        </div>
        {showMessage ? (
          <div className={styles.noComponentsMessage}>
            Get started by searching for some components above.
          </div>
        ) : (
          <div className="components-container">
            {communities.length > 0 && (
              <CommunitiesSection communities={communities} />
            )}
            {compounds.length > 0 && <CompoundsSection compounds={compounds} />}
            {media.length > 0 && <MediaSection media={media} />}
            {supplements.length > 0 && (
              <SupplementsSection supplements={supplements} />
            )}
          </div>
        )}
      </div>
    );
  }
}

ApplyToolbar.propTypes = {
  components: PropTypes.array.isRequired,
  onAddComponent: PropTypes.func,
};

const mapState = (state, props) => {
  const { components } = state.createExperiment;
  return { components };
};

const mapDispatch = {
  onAddComponent: createExperimentActions.addComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
