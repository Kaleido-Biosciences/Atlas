import React, { Component } from 'react';
import { Popup, Icon, Form, Radio } from 'semantic-ui-react';

import styles from './Plate.module.css';

export class Settings extends Component {
  state = {
    wellSize: 'small',
  };
  handlePlateSizeChange = (e, { value }) => {
    this.setState({ wellSize: value });
  };
  render() {
    const { wellSize } = this.state;
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
              checked={wellSize === 'small'}
              onChange={this.handlePlateSizeChange}
            />
            <Form.Radio
              label="Medium"
              value="medium"
              checked={wellSize === 'medium'}
              onChange={this.handlePlateSizeChange}
            />
            <Form.Radio
              label="Large"
              value="large"
              checked={wellSize === 'large'}
              onChange={this.handlePlateSizeChange}
            />
          </Form.Group>
        </Form>
      </Popup>
    );
  }
}
