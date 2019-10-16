import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { groupComponents } from '../../../store/plateFunctions';
import { ComponentTypeCircle } from '../../PlateSidebar/ComponentTypeCircle';
import styles from './Plate.module.css';

export class Well extends Component {
  groupComponents = memoize(components => groupComponents(components));
  renderComponents(groupedComponents) {
    const { communities, compounds, supplements } = groupedComponents;
    const components = [].concat(communities, compounds, supplements);
    return components.map(component => {
      return (
        <ComponentTypeCircle
          type={component.type}
          className={styles.component}
        />
      );
    });
  }
  renderMedia(media) {
    return media.map(medium => {
      return <div className={styles.medium}></div>;
    });
  }
  render() {
    console.log('render');
    const { well } = this.props;
    const components = this.groupComponents(well.components);
    return (
      <div className={styles.well}>
        <div className={styles.wellBackground}>
          <div className={styles.components}>
            {this.renderComponents(components)}
          </div>
          <div className={styles.media}>
            {this.renderMedia(components.media)}
          </div>
        </div>
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
};
