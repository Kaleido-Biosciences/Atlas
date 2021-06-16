import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { SelectedContainers } from '../SelectedContainers';
import styles from './SelectTool.module.css';

export class SelectTool extends React.Component {
  render() {
    return (
      <div className={styles.selectTool}>
        <div className={styles.shortcutsContainer}>
          <strong>Shortcuts:</strong>
          <div>
            <Button content="Plate" primary />
            <Button content="Border" primary />
            <Button content="Interior" primary />
          </div>
          <div>
            <Button content="Clear selections" />
          </div>
        </div>
        <div className={styles.selectedContainersContainer}>
          <SelectedContainers
            selectedContainersSummary={this.props.selectedContainersSummary}
            showButton={false}
          />
        </div>
      </div>
    );
  }
}

SelectTool.propTypes = {
  selectedContainersSummary: PropTypes.object,
};
