import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './PrintComponent.module.css';

export class PrintComponent extends Component {
  render() {
    const { component } = this.props;
    return (
      <div>
        <div className={styles.name}>{`${component.name}`}</div>
        <div className={styles.description}>{component.description}</div>
      </div>
    );
  }
}

PrintComponent.propTypes = {
  component: PropTypes.object.isRequired,
};
