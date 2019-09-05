import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListComponent } from './ListComponent';

export class ComponentList extends Component {
  handleComponentClick = ({ component }) => {
    if (this.props.onClick) {
      this.props.onClick({ component });
    }
  };
  render() {
    const { components } = this.props;
    return (
      <div>
        {components.map(component => {
          return (
            <ListComponent
              key={component.id}
              component={component}
              onClick={this.handleComponentClick}
            />
          );
        })}
      </div>
    );
  }
}

ComponentList.propTypes = {
  components: PropTypes.array,
  onClick: PropTypes.func,
};
