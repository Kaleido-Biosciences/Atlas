import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { SelectedContainers } from '../SelectedContainers';
import styles from './SelectTool.module.css';

export class SelectTool extends React.Component {
  handleAllClick = () => {
    if (this.props.onAllClick) {
      this.props.onAllClick(this.props.activeGridId);
    }
  };
  handleBorderClick = () => {
    if (this.props.onBorderClick) {
      this.props.onBorderClick(this.props.activeGridId);
    }
  };
  handleInteriorClick = () => {
    if (this.props.onInteriorClick) {
      this.props.onInteriorClick(this.props.activeGridId);
    }
  };
  handleDeselectAllClick = () => {
    if (this.props.onDeselectAllClick) {
      this.props.onDeselectAllClick(this.props.activeGridId);
    }
  };
  render() {
    return (
      <div className={styles.selectTool}>
        <div className={styles.shortcutsContainer}>
          <div className={styles.buttonGroup}>
            <Button
              content="All"
              icon="check square"
              onClick={this.handleAllClick}
              primary
              size="mini"
              title="Selects all containers"
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              content="Only Border"
              icon="check square"
              onClick={this.handleBorderClick}
              primary
              size="mini"
              title="Selects all border containers and deselects all interior containers"
            />
            <Button
              content="Only Interior"
              icon="check square"
              onClick={this.handleInteriorClick}
              primary
              size="mini"
              title="Selects all interior containers and deselects all border containers"
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              content="Deselect All"
              icon="square outline"
              onClick={this.handleDeselectAllClick}
              size="mini"
              title="Deselects all containers"
            />
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
  activeGridId: PropTypes.string,
  onAllClick: PropTypes.func,
  onBorderClick: PropTypes.func,
  onDeselectAllClick: PropTypes.func,
  onInteriorClick: PropTypes.func,
  selectedContainersSummary: PropTypes.object,
};
