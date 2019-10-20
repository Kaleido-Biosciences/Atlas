import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Icon, Segment } from 'semantic-ui-react';
import classNames from 'classnames';

import {
  selectToolComponents,
  deselectToolComponents,
  removeToolComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
} from '../../../../../store/experimentActions';
import { Timepoint } from './Timepoint';
import styles from './ToolComponent.module.css';

class ToolComponent extends Component {
  state = {
    collapsed: true,
  };
  handleCheckboxClick = (e, data) => {
    e.stopPropagation();
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
    e.stopPropagation();
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
  handleToggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
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
    const { collapsed } = this.state;
    const componentClass = classNames(styles.component, {
      [styles.selected]: component.selected,
    });
    const segmentClass = classNames(styles.segment, {
      red: !component.isValid,
    });
    const headerClass = classNames(styles.header, {
      [styles.expandable]: showTimepoints,
    });
    return (
      <div className={componentClass}>
        <Segment className={segmentClass}>
          <div className={headerClass} onClick={this.handleToggle}>
            <div className={styles.nameContainer}>
              <Checkbox
                value={component.id}
                onClick={this.handleCheckboxClick}
                checked={component.selected}
              />
              <span className={styles.name}>{component.displayName}</span>
            </div>
            <Icon
              title="Remove component"
              link
              className={styles.removeIcon}
              name="remove"
              onClick={this.handleRemoveClick}
            />
          </div>
          {!collapsed && showTimepoints ? (
            <div className={styles.body}>
              {showTimepoints && this.renderTimepoints()}
              {!component.isValid && (
                <div className={styles.validationErrors}>
                  {this.renderValidationErrors(component.errors)}
                </div>
              )}
            </div>
          ) : null}
        </Segment>
      </div>
    );
  }
}

ToolComponent.propTypes = {
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
  onSelect: selectToolComponents,
  onDeselect: deselectToolComponents,
  onRemoveClick: removeToolComponents,
  onAddTimepointClick: addTimepointToComponent,
  onTimepointChange: updateTimepoint,
  onTimepointDeleteClick: deleteTimepoint,
};

const connected = connect(
  null,
  mapDispatch
)(ToolComponent);
export { connected as ToolComponent };
