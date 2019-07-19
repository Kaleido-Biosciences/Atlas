import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Icon, Segment } from 'semantic-ui-react';
import classNames from 'classnames';

import { createExperimentActions } from '../../store/createExperiment';
import { Timepoint } from './Timepoint';
import styles from './ToolbarComponent.module.css';

class ToolbarComponent extends Component {
  handleCheckboxClick = (e, data) => {
    const { checked } = data;
    const { component } = this.props;
    const selection = { components: [component] };
    if (checked) {
      this.props.onSelect(selection);
    } else {
      this.props.onDeselect(selection);
    }
  };
  handleRemoveClick = (e, data) => {
    if (this.props.onRemoveClick) {
      this.props.onRemoveClick({ components: [this.props.component] });
    }
  };
  handleAddTimepointClick = () => {
    if (this.props.onAddTimepointClick) {
      const { component } = this.props;
      this.props.onAddTimepointClick({ component });
    }
  };
  handleTimepointChange = data => {
    if (this.props.onTimepointChange) {
      const { component } = this.props;
      this.props.onTimepointChange({ component, ...data });
    }
  };
  handleTimepointDeleteClick = data => {
    if (this.props.onTimepointDeleteClick) {
      const { component } = this.props;
      this.props.onTimepointDeleteClick({ component, ...data });
    }
  };
  renderTimepoints = () => {
    const {
      component,
      allowTimepointTimeChange,
      allowAddTimepoint,
    } = this.props;
    const { timepoints } = component;
    return (
      <React.Fragment>
        <div className={styles.timepoints}>
          {timepoints.map((timepoint, i) => {
            return (
              <Timepoint
                timepoint={timepoint}
                index={i}
                key={i}
                onChange={this.handleTimepointChange}
                allowDelete={i > 0}
                onDeleteClick={this.handleTimepointDeleteClick}
                allowTimeChange={allowTimepointTimeChange}
              />
            );
          })}
        </div>
        {allowAddTimepoint && (
          <div
            className={styles.addTimepoint}
            onClick={this.handleAddTimepointClick}
          >
            <Icon
              title="Add timepoint"
              link
              color="blue"
              className={styles.addTimepointIcon}
              name="plus circle"
            />{' '}
            Add Timepoint
          </div>
        )}
      </React.Fragment>
    );
  };
  renderValidationErrors = errors => {
    return errors.map((error, i) => {
      return <div key={i}>{error}</div>;
    });
  };
  renderConcentration = () => {
    const concentration = this.props.component.timepoints[0].concentration;
    return <div className="concentration">{concentration}</div>;
  };
  render() {
    const { component, showTimepoints } = this.props;
    const componentClass = classNames(styles.component, {
      selected: component.selected,
    });
    return (
      <div className={componentClass}>
        <Segment>
          <div className={styles.header}>
            <Checkbox
              label={component.displayName}
              value={component.id}
              onClick={this.handleCheckboxClick}
              checked={component.selected}
            />
            <Icon
              title="Remove component"
              link
              className={styles.removeIcon}
              name="remove"
              onClick={this.handleRemoveClick}
            />
          </div>
          {showTimepoints && this.renderTimepoints()}
          {!component.isValid && (
            <div className={styles.validationErrors}>
              {this.renderValidationErrors(component.errors)}
            </div>
          )}
        </Segment>
      </div>
    );
  }
}

ToolbarComponent.propTypes = {
  component: PropTypes.object,
  showTimepoints: PropTypes.bool,
  allowTimeChange: PropTypes.bool,
  allowAddTimepoint: PropTypes.bool,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onAddTimepointClick: PropTypes.func,
  onTimepointChange: PropTypes.func,
  onTimepointDeleteClick: PropTypes.func,
};

const mapDispatch = {
  onSelect: createExperimentActions.selectComponents,
  onDeselect: createExperimentActions.deselectComponents,
  onRemoveClick: createExperimentActions.removeComponents,
  onAddTimepointClick: createExperimentActions.addTimepointToComponent,
  onTimepointChange: createExperimentActions.updateTimepoint,
  onTimepointDeleteClick: createExperimentActions.deleteTimepoint,
};

const connected = connect(
  null,
  mapDispatch
)(ToolbarComponent);
export { connected as ToolbarComponent };
