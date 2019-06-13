import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

export class ConcentrationInput extends Component {
  state = {
    value: this.props.component.concentration,
  };
  handleClick = () => {
    this.setState({ value: this.props.component.concentration });
    this.props.onClick({ component: this.props.component });
  };
  handleInputChange = (e, { value }) => {
    this.setState({ value });
  };
  handleKeyUp = (e, data) => {
    if (e.keyCode === 13) { // Enter
      this.props.onSave({
        component: this.props.component,
        value: this.state.value,
      });
      this.props.onBlur({ component: this.props.component });
    } else if (e.keyCode === 27) { // Escape
      this.props.onBlur({ component: this.props.component });
    }
  };
  handleBlur = (e, data) => {
    this.props.onBlur({ component: this.props.component });
  };
  render() {
    const { component } = this.props;
    const { editing, concentration } = component;
    return (
      <React.Fragment>
        {editing ? (
          <Input
            label="%"
            labelPosition="right"
            value={this.state.value}
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onKeyUp={this.handleKeyUp}
            autoFocus
            className="concentration-input"
          />
        ) : (
          <span onClick={this.handleClick} className="concentration">
            @ {concentration} %
          </span>
        )}
      </React.Fragment>
    );
  }
}

ConcentrationInput.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
