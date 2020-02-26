import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ActiveContainer extends Component {
  render() {
    const { activeContainer } = this.props;
    let content;
    if (activeContainer) {
      if (activeContainer.type === 'ContainerGrid') {
        console.log(activeContainer);
        // Convert to grid and render content
      } else {
        // Just render the container
      }
      return <div>{content}</div>;
    } else return <div />;
  }
}

ActiveContainer.propTypes = {
  activeContainer: PropTypes.object,
};
