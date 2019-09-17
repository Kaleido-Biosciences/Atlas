import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { SelectStep } from './SelectStep';
import { BuildStep } from './BuildStep';
import { PrintStep } from './PrintStep';

class CreateNew extends Component {
  selectStepComplete = () => {
    this.props.history.push('build');
  };
  buildStepComplete = () => {
    this.props.history.push('print');
  };
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route
            path={`${match.path}/select`}
            render={() => <SelectStep onComplete={this.selectStepComplete} />}
          />
          <Route
            path={`${match.path}/build`}
            render={() => <BuildStep onComplete={this.buildStepComplete} />}
          />
          <Route path={`${match.path}/print`} component={PrintStep} />
          <Route render={() => <Redirect to={`${match.path}/select`} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

CreateNew.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  steps: PropTypes.object,
};

const mapState = (state, props) => {
  return { steps: state.designExperiment.steps };
};

const connected = connect(mapState)(CreateNew);
export { connected as CreateNew };
