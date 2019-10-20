import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';

import { sortComponentsByType } from '../../../store/plateFunctions';
import { WellComponent } from './WellComponent';
import styles from './Plate.module.css';

export class Well extends Component {
  sortComponents = memoize(sortComponentsByType);
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ well: this.props.well });
    }
  };
  renderComponents(components) {
    const { componentColors } = this.props.settings;
    const sortedComponents = this.sortComponents(components);
    return sortedComponents.map(component => {
      return (
        <WellComponent
          key={component.id}
          component={component}
          componentColors={componentColors}
        />
      );
    });
  }
  render() {
    const { components, selected } = this.props.well;
    const { size, padding } = this.props.settings.wellSize;
    const style = {
      height: size + 'px',
      width: size + 'px',
      padding: padding + 'px',
    };
    const wellClass = classNames(styles.well, { selected });
    return (
      <div className={styles.wellContainer} style={style}>
        <div className={styles.wellPaddingContainer}>
          <div onClick={this.handleClick} className={wellClass}>
            {this.renderComponents(components)}
          </div>
        </div>
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
