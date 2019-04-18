import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Step } from 'semantic-ui-react';

import { SelectStep } from './SelectStep';
import { BuildStep } from './BuildStep';
import { ConfirmStep } from './ConfirmStep';

class CreateNew extends Component {
  state = {
    stepOneComplete: false,
    stepTwoComplete: false,
    stepThreeComplete: false,
  };

  selectStepComplete = () => {
    this.props.history.push('build');
  };

  render() {
    const { match } = this.props;
    const { pathname } = this.props.location;
    return (
      <React.Fragment>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Step.Group ordered>
            <Step active={pathname.endsWith('select')} completed={this.props.steps.stepOneCompleted}>
              <Step.Content>
                <Step.Title>Select</Step.Title>
                <Step.Description>your experiment options</Step.Description>
              </Step.Content>
            </Step>
            <Step active={pathname.endsWith('build')}>
              <Step.Content>
                <Step.Title>Build</Step.Title>
                <Step.Description>your plates</Step.Description>
              </Step.Content>
            </Step>
            <Step>
              <Step.Content>
                <Step.Title>Confirm</Step.Title>
                <Step.Description>and print platemaps</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        </Container>
        <Container>
          <Switch>
            <Route
              path={`${match.path}/select`}
              render={() => (
                <SelectStep onStepComplete={this.selectStepComplete} />
              )}
            />
            <Route path={`${match.path}/build`} component={BuildStep} />
            <Route path={`${match.path}/confirm`} component={ConfirmStep} />
            <Route render={() => <Redirect to={`${match.path}/select`} />} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

const mapState = (state, props) => {
  return { steps: state.createExperiment.steps };
};

const connected = connect(mapState)(CreateNew);
export { connected as CreateNew };
