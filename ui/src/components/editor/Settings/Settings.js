import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Form } from 'semantic-ui-react';

import styles from './Settings.module.css';

const containerSizeOptions = [
  {
    name: 'Tiny',
    size: 80,
    innerPadding: 2,
    outerPadding: 1,
  },
  {
    name: 'Small',
    size: 120,
    innerPadding: 4,
    outerPadding: 2,
  },
  {
    name: 'Medium',
    size: 160,
    innerPadding: 4,
    outerPadding: 4,
  },
  {
    name: 'Large',
    size: 220,
    innerPadding: 4,
    outerPadding: 4,
  },
  {
    name: 'XL',
    size: 300,
    innerPadding: 4,
    outerPadding: 4,
  },
];

export class Settings extends Component {
  handleContainerSizeChange = (e, { value }) => {
    if (this.props.onChange) {
      const option = containerSizeOptions.find((option) => {
        return option.name === value;
      });
      this.props.onChange({
        settings: { containerSize: option },
      });
    }
  };
  renderOptions = () => {
    const { settings } = this.props;
    const currentSize = settings.containerSize.size;
    return containerSizeOptions.map((option) => {
      return (
        <Form.Radio
          label={option.name}
          value={option.name}
          checked={currentSize === option.size}
          onChange={this.handleContainerSizeChange}
        />
      );
    });
  };
  render() {
    return (
      <Popup
        position="bottom center"
        on="click"
        trigger={
          <Icon
            name="setting"
            className={styles.settingsIcon}
            title="Settings"
          />
        }
        className={styles.settings}
        pinned="true"
      >
        <Form>
          <Form.Group inline>
            <label>Container Size</label>
            {this.renderOptions()}
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
