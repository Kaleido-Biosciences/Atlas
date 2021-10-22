import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'KaptureApp/components';
import { SelectedWells } from '../SelectedWells';
import styles from './SelectTool.module.css';

export class SelectTool extends React.Component {
  getSelectedPlateIds = () => {
    return this.props.plates.reduce((selectedIds, plate) => {
      if (plate.selected) selectedIds.push(plate.id);
      return selectedIds;
    }, []);
  };
  // getSelectedPlateIds = () => {
  //   const { viewPlates } = this.props.activeView;
  //   const selectedIds = [];
  //   viewPlates.forEach((viewPlate) => {
  //     if (viewPlate.selected) {
  //       selectedIds.push(viewPlate.id);
  //     }
  //   });
  //   return selectedIds;
  // };
  handleAllClick = () => {
    if (this.props.onAllClick) {
      this.props.onAllClick(
        this.getSelectedPlateIds(),
        this.props.activeView.id
      );
    }
  };
  handleBorderClick = () => {
    if (this.props.onBorderClick) {
      this.props.onBorderClick(
        this.getSelectedPlateIds(),
        this.props.activeView.id
      );
    }
  };
  handleInteriorClick = () => {
    if (this.props.onInteriorClick) {
      this.props.onInteriorClick(
        this.getSelectedPlateIds(),
        this.props.activeView.id
      );
    }
  };
  handleDeselectAllClick = () => {
    if (this.props.onDeselectAllClick) {
      this.props.onDeselectAllClick(
        this.getSelectedPlateIds(),
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
            plates={this.props.plates}
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
  plates: PropTypes.array,
};
