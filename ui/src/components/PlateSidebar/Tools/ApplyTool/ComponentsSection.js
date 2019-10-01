import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToolComponent } from './ToolComponent';
import styles from './ComponentsSection.module.css';
import {Popup} from 'semantic-ui-react';

export class ComponentsSection extends Component {

  renderLabel(label, labelDescription){
    if (labelDescription){
      return (
        <Popup content={labelDescription} trigger={<h5 className={styles.header}>{label}</h5>} />
      );
    }
    else{
      return (<h5 className={styles.header}>{label}</h5>);
    }
  }

  render() {
    const {
      label,
      labelDescription,
      components,
      showTimepoints,
      allowTimepointTimeChange,
      allowAddTimepoint,
    } = this.props;
    return (
      <div className={styles.componentsSection}>
        {this.renderLabel(label, labelDescription)}
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
  labelDescription: PropTypes.string,
  components: PropTypes.array,
  showTimepoints: PropTypes.bool,
  allowTimepointTimeChange: PropTypes.bool,
  allowAddTimepoint: PropTypes.bool,
};
