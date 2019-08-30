import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Button } from 'semantic-ui-react';

import styles from './ImportResults.module.css';

export class ImportResults extends Component {
  handleBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    }
  };

  handleAdd = () => {
    if (this.props.onAdd) {
      this.props.onAdd();
    }
  };

  render() {
    const { found, notFound, total, completed } = this.props;
    const progressValue = found.length + notFound.length;
    return (
      <div>
        <div className={styles.progressContainer}>
          <Progress
            value={progressValue}
            total={total}
            indicating
            autoSuccess
          />
        </div>
        <div className={styles.importResults}>
          <div className={styles.found}>
            <h5 className={styles.header}>Found: {found.length}</h5>
            <div className={styles.results}>
              {found.map(result => {
                return <div key={result.name}>{result.name}</div>;
              })}
            </div>
          </div>
          <div className={styles.notFound}>
            <h5 className={styles.header}>Not Found: {notFound.length}</h5>
            <div className={styles.results}>
              {notFound.map(result => {
                return <div key={result.name}>{result.name}</div>;
              })}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={this.handleBack} size="small">
            Back
          </Button>
          <Button
            onClick={this.handleAdd}
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
  onBack: PropTypes.func,
  onAdd: PropTypes.func,
};
