import React from 'react';
import PropTypes from 'prop-types';

import { ToolComponent } from './ToolComponent';
import styles from './ToolComponentList.module.css';

export class ToolComponentList extends React.Component {
  handleSelectionChange = (componentId, selection) => {
    if (this.props.onSelectionsChange) {
      this.props.onSelectionsChange([componentId], selection);
    }
  };
  handleRemove = (componentId) => {
    if (this.props.onRemove) {
      this.props.onRemove([componentId]);
    }
  };
  render() {
    return (
      <div className={styles.toolComponentList}>
        {this.props.toolComponents.map((component) => {
          return (
            <ToolComponent
              key={component.id}
              onRemove={this.handleRemove}
              onSelectionChange={this.handleSelectionChange}
              toolComponent={component}
            />
          );
        })}
      </div>
    );
  }
}

ToolComponentList.propTypes = {
  toolComponents: PropTypes.array,
  onSelectionsChange: PropTypes.func,
  onRemove: PropTypes.func,
};
