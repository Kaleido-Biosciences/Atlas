import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Button } from 'semantic-ui-react';

import styles from './ImportComponents.module.css';

export class ImportResults extends Component {
  handleBackClick = () => {
    if (this.props.onBackClick) {
      this.props.onBackClick();
    }
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
    }
  };
  render() {
    const { found, notFound, total, completed } = this.props;
    const progressValue = found.length + notFound.length;
    return (
      <div className={styles.importResults}>
        <div className={styles.progressContainer}>
          <Progress
            value={progressValue}
            total={total}
            indicating
            autoSuccess
          />
        </div>
        <div className={styles.resultsContainer}>
          <div className={styles.found}>
            <h5 className={styles.header}>Found: {found.length}</h5>
            <div className={styles.results}>
              {found.map((result) => {
                return <div key={result.name}>{result.name}</div>;
              })}
            </div>
          </div>
          <div className={styles.notFound}>
            <h5 className={styles.header}>Not Found: {notFound.length}</h5>
            <div className={styles.results}>
              {notFound.map((result) => {
                return <div key={result.name}>{result.name}</div>;
              })}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={this.handleBackClick} size="small">
            Back
          </Button>
          <Button
            onClick={this.handleAddClick}
            disabled={!completed}
            size="small"
            primary
          >
            Add components
          </Button>
        </div>
      </div>
    );
  }
}

ImportResults.propTypes = {
  found: PropTypes.array,
  notFound: PropTypes.array,
  total: PropTypes.number,
  onBackClick: PropTypes.func,
  onAddClick: PropTypes.func,
};
