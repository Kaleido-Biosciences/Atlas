import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

import styles from './RemoveTool.module.css';

export class RemoveToolOption extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(null, {
        checked: !this.props.checked,
        value: this.props.componentType.name,
      });
    }
  };
  render() {
    const { componentType, checked } = this.props;
    const style = {
      background: componentType.colorCode,
    };
    return (
      <div className={styles.option}>
        <Checkbox
          value={componentType.name}
          onClick={this.handleClick}
          checked={checked}
        />
        <div className={styles.label} onClick={this.handleClick}>
          <div className={styles.typeCircle} style={style}></div>
          <div className={styles.optionName}>{componentType.plural}</div>
        </div>
      </div>
    );
  }
}

RemoveToolOption.propTypes = {
  componentType: PropTypes.object,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};
