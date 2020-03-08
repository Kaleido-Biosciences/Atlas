import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Form } from 'semantic-ui-react';

import styles from './Settings.module.css';

const containerSizeOptions = {
  small: {
    size: 120,
    padding: 5,
  },
  medium: {
    size: 180,
    padding: 5,
  },
  large: {
    size: 240,
    padding: 5,
  },
};

export class Settings extends Component {
  handleContainerSizeChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange({
        settings: { containerSize: containerSizeOptions[value] },
      });
    }
  };
  render() {
    const { containerSize } = this.props.settings;
    const size = containerSize.size;
    return (
      <Popup
        position="right center"
        on="click"
        trigger={<Icon name="setting" className={styles.settingsIcon} />}
        className={styles.settings}
      >
        <Form>
          <Form.Group inline>
            <label>Well Size</label>
            <Form.Radio
              label="Small"
              value="small"
              checked={size === containerSizeOptions.small.size}
              onChange={this.handleContainerSizeChange}
            />
            <Form.Radio
              label="Medium"
              value="medium"
              checked={size === containerSizeOptions.medium.size}
              onChange={this.handleContainerSizeChange}
            />
            <Form.Radio
              label="Large"
              value="large"
              checked={size === containerSizeOptions.large.size}
              onChange={this.handleContainerSizeChange}
            />
          </Form.Group>
        </Form>
      </Popup>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};
