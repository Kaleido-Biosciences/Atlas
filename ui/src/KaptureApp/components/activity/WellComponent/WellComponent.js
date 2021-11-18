import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentTooltip } from 'KaptureApp/components/activity/ComponentTooltip';
import styles from './WellComponent.module.css';

export class WellComponent extends Component {
  handleRemoveClick = (e) => {
    e.stopPropagation();
    if (this.props.onRemove) {
      this.props.onRemove(this.props.component.id);
    }
  };
  render() {
    const { component, position } = this.props;
    const divProps = {
      className: this.props.compact
        ? styles.compactWellComponent
        : styles.wellComponent,
      style: {
        background: component.colorCode,
      },
    };
    const stringPosition = `${position.row}${position.column}`;
    if (component.tooltip.length) {
      divProps['data-tip'] = true;
      divProps['data-for'] = `${stringPosition}-${component.id}`;
    }
    return (
      <div>
        <div {...divProps}>
          <div>
            {this.props.compact ? (
              <div className={styles.compactName}>{component.data.name}</div>
            ) : (
              <div className={styles.name}>{component.name}</div>
            )}
            {!this.props.compact ? (
              <div className={styles.description}>{component.description}</div>
            ) : null}
          </div>
          {this.props.enableRemove ? (
            <div onClick={this.handleRemoveClick}>
              <FontAwesomeIcon icon="times" />
            </div>
          ) : null}
        </div>

        {this.props.enableTooltip && component.tooltip.length > 0 && (
          <ComponentTooltip
            id={`${stringPosition}-${component.id}`}
            tooltip={component.tooltip}
          />
        )}
      </div>
    );
  }
}

WellComponent.propTypes = {
  compact: PropTypes.bool,
  component: PropTypes.object.isRequired,
  enableRemove: PropTypes.bool,
  enableTooltip: PropTypes.bool,
  onRemove: PropTypes.func,
  position: PropTypes.object.isRequired,
};

WellComponent.defaultProps = {
  enableRemove: false,
};
