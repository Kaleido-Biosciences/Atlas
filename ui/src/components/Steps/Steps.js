import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Step } from 'semantic-ui-react';

import styles from './Steps.module.css';

export class Steps extends Component {
  render() {
    const { pathName, steps } = this.props;
    const { stepOneCompleted, stepTwoCompleted, stepThreeCompleted } = steps;
    return (
      <div className={styles.steps}>
        <Step.Group unstackable ordered>
          <Step
            active={pathName.endsWith('select')}
            completed={stepOneCompleted}
          >
            <Step.Content>
              <Step.Title>Select</Step.Title>
              <Step.Description>experiment options</Step.Description>
            </Step.Content>
          </Step>
          <Step
            active={pathName.endsWith('build')}
            completed={stepTwoCompleted}
          >
            <Step.Content>
              <Step.Title>Build</Step.Title>
              <Step.Description>plate maps</Step.Description>
            </Step.Content>
          </Step>
          <Step
            active={pathName.endsWith('print')}
            completed={stepThreeCompleted}
          >
            <Step.Content>
              <Step.Title>Print</Step.Title>
              <Step.Description>plate maps</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
    );
  }
}

Steps.propTypes = {
  pathName: PropTypes.string,
  steps: PropTypes.object,
};
