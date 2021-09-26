import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../Button';
import { SelectedWells } from '../SelectedWells';
import styles from './SelectTool.module.css';

export class SelectTool extends React.Component {
  getSelectedGridIds = () => {
    const { viewGrids } = this.props.activeView.data;
    const selectedIds = [];
    viewGrids.forEach((viewGrid) => {
      if (viewGrid.selected) {
        selectedIds.push(viewGrid.id);
      }
    });
    return selectedIds;
  };
  handleAllClick = () => {
    if (this.props.onAllClick) {
      this.props.onAllClick(
        this.getSelectedGridIds(),
        this.props.activeView.id
      );
    }
  };
  handleBorderClick = () => {
    if (this.props.onBorderClick) {
      this.props.onBorderClick(
        this.getSelectedGridIds(),
        this.props.activeView.id
      );
    }
  };
  handleInteriorClick = () => {
    if (this.props.onInteriorClick) {
      this.props.onInteriorClick(
        this.getSelectedGridIds(),
        this.props.activeView.id
      );
    }
  };
  handleDeselectAllClick = () => {
    if (this.props.onDeselectAllClick) {
      this.props.onDeselectAllClick(
        this.getSelectedGridIds(),
        this.props.activeView.id
      );
    }
  };
  render() {
    return (
      <div className={styles.selectTool}>
        <div className={styles.shortcutsContainer}>
          <div className={styles.buttonGroup}>
            <Button
              content="All"
              icon="check-square"
              onClick={this.handleAllClick}
              secondary
              title="Selects all containers"
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              className="mr-1"
              content="Only Interior"
              icon="check-square"
              onClick={this.handleInteriorClick}
              secondary
              title="Selects all interior containers and deselects all border containers"
            />
            <Button
              content="Only Border"
              icon="check-square"
              onClick={this.handleBorderClick}
              secondary
              title="Selects all border containers and deselects all interior containers"
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              content="Deselect All"
              icon={['far', 'square']}
              onClick={this.handleDeselectAllClick}
              secondary
              title="Deselects all containers"
            />
          </div>
        </div>
        <div className={styles.selectedContainersContainer}>
          <SelectedWells
            activeView={this.props.activeView}
            showButton={false}
          />
        </div>
      </div>
    );
  }
}

SelectTool.propTypes = {
  activeView: PropTypes.object,
  onAllClick: PropTypes.func,
  onBorderClick: PropTypes.func,
  onDeselectAllClick: PropTypes.func,
  onInteriorClick: PropTypes.func,
};
