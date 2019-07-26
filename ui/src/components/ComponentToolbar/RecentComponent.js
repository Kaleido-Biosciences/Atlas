import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

export class RecentComponent extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };
  handleRemoveClick = (e) => {
    e.stopPropagation();
    if (this.props.onRemoveClick) {
      this.props.onRemoveClick({ component: this.props.component });
    }
  };
  render() {
    return (
      <Label as="a" onClick={this.handleClick} className={this.props.className}>
        {this.props.component.displayName}
        <Icon name="close" onClick={this.handleRemoveClick} />
      </Label>
    );
  }
}

RecentComponent.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};
