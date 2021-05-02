import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import styles from './ToolComponentList.module.css';

export class ToolComponent extends React.Component {
  handleCheckboxClick = () => {
    const { toolComponent } = this.props;
    const selection = !toolComponent.selected;
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(toolComponent.id, selection);
    }
  };
  handleRemoveClick = () => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.toolComponent.id);
    }
  };
  handleEditClick = () => {
    if (this.props.toolComponent.editable) {
      if (this.props.onUpdate) {
        const updatedComponent = { ...this.props.toolComponent };
        updatedComponent.displayEditForm = !updatedComponent.displayEditForm;
        this.props.onUpdate(updatedComponent);
      }
    }
  };
  handleEditFormChange = (updatedComponent) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(updatedComponent);
    }
  };
  renderValidationErrors = () => {
    return this.props.toolComponent.errors.map((error, i) => {
      return <div key={i}>{error}</div>;
    });
  };
  render() {
    const { toolComponent } = this.props;
    const EditForm = this.props.editForm;
    const style = {
      background: toolComponent.colorCode,
    };
    const componentClass = classNames(styles.toolComponent, {
      [styles.selected]: toolComponent.selected,
    });
    const nameContainerClass = classNames(styles.nameContainer, {
      [styles.editable]: toolComponent.editable,
    });
    return (
      <div className={componentClass} style={style}>
        <div className={styles.body}>
          <div onClick={this.handleCheckboxClick}>
            {toolComponent.selected ? (
              <Icon link name="check square outline" size="large" />
            ) : (
              <Icon link name="square outline" size="large" />
            )}
          </div>
          <div className={nameContainerClass} onClick={this.handleEditClick}>
            <div className={styles.name}>{`${toolComponent.name}`}</div>
            {toolComponent.description ? (
              <div className={styles.description}>
                {toolComponent.description}
              </div>
            ) : null}
          </div>
          <div onClick={this.handleRemoveClick}>
            <Icon link name="remove" size="large" />
          </div>
        </div>
        {toolComponent.displayEditForm && EditForm ? (
          <div className={styles.editForm}>
            <EditForm
              component={toolComponent}
              onChange={this.handleEditFormChange}
            />
            {!toolComponent.isValid && (
              <div className={styles.validationErrors}>
                {this.renderValidationErrors()}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

ToolComponent.propTypes = {
  editForm: PropTypes.func,
  onRemove: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onUpdate: PropTypes.func,
  toolComponent: PropTypes.object,
};
