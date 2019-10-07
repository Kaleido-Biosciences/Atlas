import React, { Component } from 'react';
import { Header, Statistic } from 'semantic-ui-react';

import { aws } from '../../api';
import { getPlateStatistics } from '../../store/plateFunctions';
import styles from './Statistics.module.css';

export class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experiments: [],
    };
    aws.scanTable().then(experiments => {
      const index = {};
      experiments.forEach(experiment => {
        const { experiment_status: status } = experiment;
        const name = status.split('_')[0];
        if (index[name]) {
          if (index[name] < experiment.version) {
            index[name] = experiment.version;
          }
        } else index[name] = experiment.version;
      });
      const names = [];
      const filtered = experiments.filter(experiment => {
        const { experiment_status: status } = experiment;
        const name = status.split('_')[0];
        if (index[name] === experiment.version) {
          if (!names.includes(name)) {
            names.push(name);
            return true;
          }
          return false;
        } else return false;
      });
      this.setState({ experiments: filtered });
    });
  }
  renderPlateSizes(plateSizes) {
    const stats = [];
    plateSizes.forEach((value, key, map) => {
      stats.push(
        <Statistic key={key}>
          <Statistic.Value>{value}</Statistic.Value>
          <Statistic.Label>{`# of ${key} well plates`}</Statistic.Label>
        </Statistic>
      );
    });
    return stats;
  }
  renderStatistics() {
    const { experiments } = this.state;
    let numberOfExperiments = experiments.length,
      totalNumberOfPlates = 0,
      platesPerExperimentMin = 0,
      platesPerExperimentMax = 0,
      platesWithEmptyBorders = 0,
      emptyPlates = 0,
      plateSizes = new Map(),
      nonEmptyPlates = [],
      fullPlates = 0,
      totalNumberOfWells = 0,
      totalNumberOfFilledWells = 0,
      totalNumberofEmptyWells = 0,
      maxNumberOfComponentsInWell = 0;
    const experimentStats = [];
    experiments.forEach(experiment => {
      const numberOfPlates = experiment.plateMaps.length;
      const statsGroup = {
        experiment,
        plateStats: [],
      };
      totalNumberOfPlates += numberOfPlates;
      if (numberOfPlates < platesPerExperimentMin)
        platesPerExperimentMin = numberOfPlates;
      if (numberOfPlates > platesPerExperimentMax)
        platesPerExperimentMax = numberOfPlates;
      experiment.plateMaps.forEach(plate => {
        const stats = getPlateStatistics(plate);
        const plateSize = stats.numberOfWells;
        const currentPlateSize = plateSizes.get(plateSize);
        if (currentPlateSize) {
          plateSizes.set(plateSize, currentPlateSize + 1);
        } else {
          plateSizes.set(plateSize, 1);
        }
        if (stats.empty) {
          emptyPlates++;
        }
        if (!stats.empty && stats.emptyBorders) {
          platesWithEmptyBorders++;
        }
        if (!stats.empty) {
          nonEmptyPlates.push(plate);
        }
        if (stats.full) {
          fullPlates++;
        }
        if (stats.maxComponentsInWell > maxNumberOfComponentsInWell) {
          maxNumberOfComponentsInWell = stats.maxComponentsInWell;
        }
        totalNumberOfWells += stats.numberOfWells;
        totalNumberOfFilledWells += stats.numberOfFilledWells;
        totalNumberofEmptyWells += stats.numberOfEmptyWells;
        statsGroup.plateStats.push(stats);
      });
      experimentStats.push(statsGroup);
    });
    let platesPerExperimentAvg = totalNumberOfPlates / numberOfExperiments;
    return (
      <React.Fragment>
        <Statistic.Group size="mini">
          <Statistic>
            <Statistic.Value>{numberOfExperiments}</Statistic.Value>
            <Statistic.Label>Experiments</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{totalNumberOfPlates}</Statistic.Value>
            <Statistic.Label>Plates</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              {platesPerExperimentAvg.toFixed(2)}
            </Statistic.Value>
            <Statistic.Label>Avg # of Plates</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{platesPerExperimentMin}</Statistic.Value>
            <Statistic.Label>Min # of Plates</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{platesPerExperimentMax}</Statistic.Value>
            <Statistic.Label>Max # of Plates</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Statistic.Group size="mini">
          {this.renderPlateSizes(plateSizes)}
          <Statistic>
            <Statistic.Value>{emptyPlates}</Statistic.Value>
            <Statistic.Label># of Empty Plates</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{platesWithEmptyBorders}</Statistic.Value>
            <Statistic.Label># non empty w/ empty border</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{fullPlates}</Statistic.Value>
            <Statistic.Label>Full plates</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Statistic.Group size="mini">
          <Statistic>
            <Statistic.Value>{totalNumberOfWells}</Statistic.Value>
            <Statistic.Label>Total # of wells</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{totalNumberOfFilledWells}</Statistic.Value>
            <Statistic.Label>Total # of filled wells</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{totalNumberofEmptyWells}</Statistic.Value>
            <Statistic.Label>Total # of empty wells</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{maxNumberOfComponentsInWell}</Statistic.Value>
            <Statistic.Label>Max # of components in well</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Empty</th>
              <th>Empty Borders</th>
              <th>Full</th>
              <th>Max Components in Well</th>
              <th>Distinct Communities</th>
              <th>Distinct Compounds</th>
              <th>Distinct Media</th>
              <th>Distinct Supplements</th>
              <th>Distinct Attributes</th>
              <th># empty wells</th>
              <th># filled wells</th>
              <th># wells</th>
            </tr>
          </thead>
          <tbody>{this.renderStatsTable(experimentStats)}</tbody>
        </table>
      </React.Fragment>
    );
  }
  renderStatsTable(experimentStats) {
    const rows = [];
    experimentStats.forEach(experimentGroup => {
      const { experiment, plateStats } = experimentGroup;
      const { experiment_status: name } = experiment;
      const trueString = 'Y';
      const falseString = 'N';
      rows.push(<tr><td colSpan={12}><strong>{`${name} (${plateStats.length})`}</strong></td></tr>);
      plateStats.forEach((stats, i) => {
        rows.push(
          <tr>
            <td>{`Plate ${i + 1}`}</td>
            <td>{stats.empty ? trueString : falseString}</td>
            <td>{stats.emptyBorders ? trueString : falseString}</td>
            <td>{stats.full ? trueString : falseString}</td>
            <td>{stats.maxComponentsInWell}</td>
            <td>{stats.numberOfDistinctCommunities}</td>
            <td>{stats.numberOfDistinctCompounds}</td>
            <td>{stats.numberOfDistinctMedia}</td>
            <td>{stats.numberOfDistinctSupplements}</td>
            <td>{stats.numberOfDistinctAttributes}</td>
            <td>{stats.numberOfEmptyWells}</td>
            <td>{stats.numberOfFilledWells}</td>
            <td>{stats.numberOfWells}</td>
          </tr>
        );
      });
    });
    return rows;
  }
  render() {
    const { experiments } = this.state;
    return (
      <div className={styles.container}>
        <Header>Statistics</Header>
        {experiments && !!experiments.length && this.renderStatistics()}
      </div>
    );
  }
}
