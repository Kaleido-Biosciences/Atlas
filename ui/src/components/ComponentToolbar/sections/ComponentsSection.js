import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToolbarComponent } from '../ToolbarComponent';
import styles from './ComponentsSection.module.css';

export class ComponentsSection extends Component {
  render() {
    const {
      label,
      components,
      showTimepoints,
      allowTimepointTimeChange,
      allowAddTimepoint,
    } = this.props;
    return (
      <div className={styles.componentsSection}>
        <h4>{label}</h4>
        <div className="components">
          {components.map(component => {
            return (
              <ToolbarComponent
                key={component.id}
                component={component}
                showTimepoints={showTimepoints}
                allowTimepointTimeChange={allowTimepointTimeChange}
                allowAddTimepoint={allowAddTimepoint}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ComponentsSection.propTypes = {
  label: PropTypes.string,
  components: PropTypes.array,
  showTimepoints: PropTypes.bool,
  allowTimepointTimeChange: PropTypes.bool,
  allowAddTimepoint: PropTypes.bool,
};
