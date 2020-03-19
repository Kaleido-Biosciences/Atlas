import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { CommunitiesSection } from './CommunitiesSection';
import { CompoundsSection } from './CompoundsSection';
import { MediaSection } from './MediaSection';
import { SupplementsSection } from './SupplementsSection';
import { AttributesSection } from './AttributesSection';
import { groupComponents } from '../../../../store/plateFunctions';
import { SelectedContainers } from './SelectedContainers';
import styles from './ApplyTool.module.css';

export class ApplyTool extends Component {
  groupComponents = memoize(groupComponents);
  handleApplyClick = () => {
    const { activePlate } = this.props;
    if (this.props.onApplyClick) {
      this.props.onApplyClick({ plateId: activePlate.id });
    }
  };
  handleAddAttribute = ({ component }) => {
    if (this.props.onAddAttribute) {
      this.props.onAddAttribute({ component });
    }
  };
  render() {
    const {
      toolComponents,
      toolComponentsValid,
      selectedContainersSummary,
    } = this.props;
    const groupedComponents = this.groupComponents(toolComponents);
    const {
      communities,
      compounds,
      media,
      supplements,
      attributes,
    } = groupedComponents;
    const showComponents =
      toolComponents.filter(x => x.type !== 'attribute').length > 0;
    return (
      <div className={styles.applyTool}>
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
              Add components by clicking on a component in the components list.
            </div>
          )}
          <AttributesSection
            attributes={attributes}
            addAttribute={this.handleAddAttribute}
          />
        </div>
        {selectedContainersSummary && selectedContainersSummary.count > 0 ? (
          <div className={styles.selectedContainersContainer}>
            <SelectedContainers
              selectedContainersSummary={selectedContainersSummary}
              showButton={showComponents}
              buttonDisabled={!toolComponentsValid}
              onApplyClick={this.handleApplyClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ApplyTool.propTypes = {
  toolComponents: PropTypes.array.isRequired,
  toolComponentsValid: PropTypes.bool.isRequired,
  selectedContainersSummary: PropTypes.array.isRequired,
  activePlate: PropTypes.object,
  onApplyClick: PropTypes.func,
  onAddAttribute: PropTypes.func,
};
