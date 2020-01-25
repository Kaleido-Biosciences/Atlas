import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import { PlateSizeForm } from '../PlateSizeForm';
import styles from './ActivityDetails.module.css';

export class NewActivity extends Component {
  state = {
    submitDisabled: false,
  };
  handlePlateSizeChange = ({ plateSize }) => {
    if (plateSize === null) {
      this.setState({ submitDisabled: true });
    } else {
      this.setState({ submitDisabled: false });
    }
    if (this.props.onPlateSizeChange) {
      this.props.onPlateSizeChange({ plateSize });
    }
  };
  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };
  render() {
    const { defaultPlateSize } = this.props;
    return (
      <div className={styles.newActivity}>
        <Header as="h3">Start Activity</Header>
        Select a plate size to get started
        <div className={styles.plateSizeFormContainer}>
          <PlateSizeForm
            defaultDimensions={defaultPlateSize}
            onChange={this.handlePlateSizeChange}
          />
        </div>
        <Button
          onClick={this.handleSubmit}
          disabled={this.state.submitDisabled}
          primary
        >
          Get Started
        </Button>
      </div>
    );
  }
}

NewActivity.propTypes = {
  defaultPlateSize: PropTypes.object,
  onPlateSizeChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
