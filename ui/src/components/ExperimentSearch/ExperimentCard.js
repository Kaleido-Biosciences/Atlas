import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Label } from 'semantic-ui-react';

import { getPlateSize } from '../../store/plateFunctions';
import styles from './ExperimentCard.module.css';

export class ExperimentCard extends Component {
  render() {
    const { experiment, plates } = this.props;
    const scientistName = experiment.scientist
      ? `${experiment.scientist.lastName}, ${experiment.scientist.firstName}`
      : '';
    let rows,
      columns,
      numberOfWells,
      displayPlateInfo = false;
    if (plates && plates.length > 0) {
      const dimensions = getPlateSize(plates[0]);
      displayPlateInfo = true;
      rows = dimensions.rows;
      columns = dimensions.columns;
      numberOfWells = rows * columns;
    }
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{experiment.name}</Card.Header>
          <Card.Description>{experiment.description}</Card.Description>
        </Card.Content>
        <Card.Content className={styles.labelContainer}>
          <Label>
            Study name
            <Label.Detail>{experiment.studyName}</Label.Detail>
          </Label>
          <Label>
            Scientist
            <Label.Detail>{scientistName}</Label.Detail>
          </Label>
          {displayPlateInfo && (
            <Label>
              Plates
              <Label.Detail>{plates.length}</Label.Detail>
            </Label>
          )}
          {displayPlateInfo && (
            <Label>
              Plate Size
              <Label.Detail>{`${rows} x ${columns}, ${numberOfWells} wells`}</Label.Detail>
            </Label>
          )}
        </Card.Content>
      </Card>
    );
  }
}

ExperimentCard.propTypes = {
  experiment: PropTypes.object.isRequired,
  plates: PropTypes.array,
};
