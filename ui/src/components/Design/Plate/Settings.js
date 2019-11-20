import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Popup, Icon, Form } from 'semantic-ui-react';

import { setSettings } from '../../../store/designActions';
import styles from './Plate.module.css';

const wellSizeOptions = {
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

class Settings extends Component {
  handleWellSizeChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange({ settings: { wellSize: wellSizeOptions[value] } });
    }
  };
  render() {
    const { wellSize } = this.props.settings;
    const size = wellSize.size;
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
              checked={size === wellSizeOptions.small.size}
              onChange={this.handleWellSizeChange}
            />
            <Form.Radio
              label="Medium"
              value="medium"
              checked={size === wellSizeOptions.medium.size}
              onChange={this.handleWellSizeChange}
            />
            <Form.Radio
              label="Large"
              value="large"
              checked={size === wellSizeOptions.large.size}
              onChange={this.handleWellSizeChange}
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

const mapState = (state, props) => {
  const { settings } = state.designExperiment;
  return { settings };
};

const mapDispatch = {
  onChange: setSettings,
};

const connected = connect(
  mapState,
  mapDispatch
)(Settings);
export { connected as Settings };
