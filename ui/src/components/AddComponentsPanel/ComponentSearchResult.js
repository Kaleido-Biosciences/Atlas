import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import { ComponentTypeCircle } from './ComponentTypeCircle';
import styles from './ComponentSearchResults.module.css';

export class ComponentSearchResult extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ kaptureComponent: this.props.component });
    }
  };
  render() {
    const { component } = this.props;
    const { data } = component;
    return (
      <Card fluid key={data.id} onClick={this.handleClick}>
        <Card.Content>
          <Card.Header>
            <ComponentTypeCircle
              componentType={component.type}
              className={styles.typeCircle}
            />
            {data.name}
          </Card.Header>
          {data.description ? (
            <Card.Description>{data.description}</Card.Description>
          ) : null}
          {data.notes ? (
            <Card.Description>{data.notes}</Card.Description>
          ) : null}
        </Card.Content>
      </Card>
    );
  }
}

ComponentSearchResult.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
