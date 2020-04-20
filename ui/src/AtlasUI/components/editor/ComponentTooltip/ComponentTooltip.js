import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import styles from './ComponentTooltip.module.css';

export class ComponentTooltip extends Component {
  render() {
    const { tooltip } = this.props;
    const renderedItems = tooltip.map((item) => {
      return (
        <List.Item key={item.key}>
          <List.Header>{item.key}</List.Header>
          {item.value}
        </List.Item>
      );
    });
    return (
      <div className={styles.componentTooltip}>
        <List>{renderedItems}</List>
      </div>
    );
  }
}

ComponentTooltip.propTypes = {
  tooltip: PropTypes.array.isRequired,
};
