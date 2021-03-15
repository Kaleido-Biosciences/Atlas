import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import styles from './ToolComponentList.module.css';

const getDescription = (timepoints) => {
  const timepointStrings = timepoints.map((timepoint) => {
    if (timepoint.concentration) {
      return `${timepoint.concentration.toFixed(2)} @ 
            ${timepoint.time}h`;
    } else return '';
  });
  return timepointStrings.join(', ');
};

export class ToolComponent extends React.Component {
  handleCheckboxClick = () => {
    const { toolComponent } = this.props;
    const selection = !toolComponent.selected;
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(toolComponent.id, selection);
    }
  };
  handleRemoveClick = () => {
    const { toolComponent } = this.props;
    if (this.props.onRemove) {
      this.props.onRemove(toolComponent.id);
    }
  };
  render() {
    const toolComponent = this.props.toolComponent;
    const style = {
      background: toolComponent.colorCode,
    };
    const componentClass = classNames(styles.toolComponent, {
      [styles.selected]: toolComponent.selected,
    });
    const description = getDescription(toolComponent.timepoints);
    return (
      <div className={componentClass} style={style}>
        <div onClick={this.handleCheckboxClick}>
          {toolComponent.selected ? (
            <Icon name="check square outline" size="large" />
          ) : (
            <Icon name="square outline" size="large" />
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.name}>{`${toolComponent.name}`}</div>
          {description ? (
            <div className={styles.description}>{description}</div>
          ) : null}
        </div>
        <div onClick={this.handleRemoveClick}>
          <Icon name="remove" size="large" />
        </div>
      </div>
    );
  }
}

ToolComponent.propTypes = {
  toolComponent: PropTypes.object,
  onRemove: PropTypes.func,
  onSelectionChange: PropTypes.func,
};
