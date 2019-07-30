import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Label } from 'semantic-ui-react';

export class ExperimentCard extends Component {
  render() {
    const { experiment } = this.props;
    const scientistName = experiment.scientist
      ? `${experiment.scientist.lastName}, ${experiment.scientist.firstName}`
      : '';
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{experiment.name}</Card.Header>
          <Card.Description>{experiment.description}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Label>
            Study name
            <Label.Detail>{experiment.studyName}</Label.Detail>
          </Label>
          <Label>
            Scientist
            <Label.Detail>{scientistName}</Label.Detail>
          </Label>
        </Card.Content>
      </Card>
    );
  }
}

ExperimentCard.propTypes = {
  experiment: PropTypes.object.isRequired,
};
