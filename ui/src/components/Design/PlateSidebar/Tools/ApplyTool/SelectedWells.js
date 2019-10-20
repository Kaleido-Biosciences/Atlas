import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import styles from './ApplyTool.module.css';

export class SelectedWells extends Component {
  handleApplyClick = () => {
    if (this.props.onApplyClick) {
      this.props.onApplyClick();
    }
  };
  renderSelectedWells() {
    const { selectedWells } = this.props;
    if (selectedWells) {
      let wellString = null,
        headerText;
      if (selectedWells.length > 0) {
        const wellNames = selectedWells.map(well => well.name);
        wellString = wellNames.join(', ');
        headerText = 'Selected Wells:';
      } else {
        headerText = 'No wells selected.';
      }
      return (
        <div className={styles.selectedWellsText}>
          <Header size="tiny">{headerText}</Header>
          {wellString}
        </div>
      );
    }
  }
  render() {
    const { selectedWells, showButton, buttonDisabled } = this.props;
    return (
      <div>
        {this.renderSelectedWells()}
        {showButton ? (
          <div className={styles.selectedWellsButtonContainer}>
            <Button
              disabled={buttonDisabled}
              primary
              onClick={this.handleApplyClick}
              size="mini"
            >
              Apply to {selectedWells.length} wells
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

SelectedWells.propTypes = {
  selectedWells: PropTypes.array,
  showButton: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
  onApplyClick: PropTypes.func,
};
