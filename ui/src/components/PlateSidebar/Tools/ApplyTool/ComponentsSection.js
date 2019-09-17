import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToolComponent } from './ToolComponent';
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
        <h5 className={styles.header}>{label}</h5>
        <div className="components">
          {components.map(component => {
            return (
              <ToolComponent
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
