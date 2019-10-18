import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';

import { sortComponentsByType } from '../../../store/plateFunctions';
import { WellComponent } from './WellComponent';
import styles from './Plate.module.css';

export class Well extends Component {
  sortComponents = memoize(sortComponentsByType);
  renderComponents(components) {
    const sortedComponents = this.sortComponents(components);
    return sortedComponents.map(component => {
      return <WellComponent key={component.id} component={component} />;
    });
  }
  render() {
    const { well, wellSize } = this.props;
    const { components, selected } = well;
    const { size, padding } = wellSize;
    const style = {
      height: size + 'px',
      width: size + 'px',
      padding: padding + 'px',
    };
    const wellClass = classNames(styles.well, { selected });
    return (
      <div className={wellClass} style={style}>
        <div className={styles.wellBackground}>
          {this.renderComponents(components)}
        </div>
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
  wellSize: PropTypes.object.isRequired,
};
