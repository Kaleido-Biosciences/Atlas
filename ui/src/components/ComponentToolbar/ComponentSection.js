import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToolbarComponent } from './ToolbarComponent';
import styles from './ComponentSection.module.css';

export class ComponentSection extends Component {
  render() {
    const {
      label,
      components,
      showTimepoints,
      allowTimepointTimeChange,
      allowAddTimepoint,
    } = this.props;
    return (
      <div className={styles.componentSection}>
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

ComponentSection.propTypes = {
  label: PropTypes.string,
  components: PropTypes.array,
  showTimepoints: PropTypes.bool,
  allowTimepointTimeChange: PropTypes.bool,
  allowAddTimepoint: PropTypes.bool,
};
