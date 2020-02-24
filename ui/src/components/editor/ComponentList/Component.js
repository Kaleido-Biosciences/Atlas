import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Label, Popup } from 'semantic-ui-react';
import { ComponentTypeCircle } from '../ComponentTypeCircle';
import { ComponentToolTip } from '../ComponentToolTip';

import styles from './ComponentList.module.css';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };

  renderComponentDetails() {
    const { component } = this.props;
    if (component.type === 'compound' || component.type === 'supplement') {
      return (
        <Popup
          position="top center"
          trigger={
            <div>
              <ComponentTypeCircle
                type={component.type}
                className={styles.typeCircle}
              />
              {component.displayName}
            </div>
          }
        >
          <Popup.Content>
            {' '}
            <ComponentToolTip component={component} />{' '}
          </Popup.Content>
        </Popup>
      );
    } else {
      return (
        <div>
          <ComponentTypeCircle
            type={component.type}
            className={styles.typeCircle}
          />
          {component.displayName}
        </div>
      );
    }
  }

  render() {
    const { count } = this.props;
    const componentClass = classNames(styles.component, {
      [styles.notUsed]: !count,
    });
    return (
      <div onClick={this.handleClick} className={componentClass}>
        {this.renderComponentDetails()}
        {count && <Label className={styles.componentLabel}>{count}</Label>}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};