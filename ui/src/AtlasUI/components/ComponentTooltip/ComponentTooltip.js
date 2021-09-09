import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import styles from './ComponentTooltip.module.css';

export class ComponentTooltip extends Component {
  render() {
    const renderedItems = this.props.tooltip.map((item) => {
      return (
        <div className={styles.item} key={item.key}>
          <div className={styles.label}>{item.key}</div>
          <div className={styles.value}>{item.value}</div>
        </div>
      );
    });
    return (
      <ReactTooltip
        backgroundColor="#FFF"
        border={true}
        borderColor="#d4d4d5"
        className={styles.reactTooltip}
        id={this.props.id}
        type="info"
      >
        <div className={styles.componentTooltip}>{renderedItems}</div>
      </ReactTooltip>
    );
  }
}

ComponentTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.array.isRequired,
};
