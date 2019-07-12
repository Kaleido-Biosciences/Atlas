import React, { Component } from 'react';
import { Form, Checkbox, Icon } from 'semantic-ui-react';

export class ToolbarComponent extends Component {
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
  handleAddTimepoint = () => {};
  renderTimepoints = () => {
    const { timepoints } = this.props.component;
    return (
      <div className="timepoints">
        {timepoints.map((timepoint, i) => {
          return (
            <div className="timepoint" key={i}>
              {timepoint.time} {timepoint.concentration}
            </div>
          );
        })}
        <div className="add-timepoint">
          <Icon name="plus circle" onClick={this.handleAddTimepoint} /> Add
          Timepoint
        </div>
      </div>
    );
  };
  renderConcentration = () => {
    const concentration = this.props.component.timepoints[0].concentration;
    return <div className="concentration">{concentration}</div>;
  };
  render() {
    const { component, showTimepoints, showConcentration } = this.props;
    return (
      <div>
        <Form>
          <Checkbox
            label={component.displayName}
            value={component.id}
            onClick={this.handleCheckboxClick}
            checked={component.selected}
          />
          {showTimepoints && this.renderTimepoints()}
          {!showTimepoints && showConcentration && this.renderConcentration()}
        </Form>
      </div>
    );
  }
}
