import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Step } from 'semantic-ui-react';

import { SelectStep } from './SelectStep';
import { BuildStep } from './BuildStep';
import { ConfirmStep} from './ConfirmStep';

export class CreateNew extends Component {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Step.Group ordered>
            <Step>
              <Step.Content>
                <Step.Title>Select</Step.Title>
                <Step.Description>your experiment options</Step.Description>
              </Step.Content>
            </Step>
            <Step>
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
            <Route path={`${match.path}/select`} component={SelectStep} />
            <Route path={`${match.path}/build`} component={BuildStep} />
            <Route path={`${match.path}/confirm`} component={ConfirmStep}/>
            <Route render={() => <Redirect to={`${match.path}/select`} />} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}
