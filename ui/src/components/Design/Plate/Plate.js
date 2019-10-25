import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  toggleWellsSelected,
  applySelectedToolComponentsToWells,
  clearWells,
} from '../../../store/experimentActions';
import { selectActivePlate } from '../../../store/selectors';
import { Settings } from './Settings';
import { ColumnHeader } from './ColumnHeader';
import { RowHeader } from './RowHeader';
import { Wells } from './Wells';
import { Details } from './Details';
import styles from './Plate.module.css';

class Plate extends Component {
  columnHeaderRef = React.createRef();
  rowHeaderRef = React.createRef();
  handleScroll = values => {
    this.columnHeaderRef.current.setScrollPos(values.scrollLeft);
    this.rowHeaderRef.current.setScrollPos(values.scrollTop);
  };
  handleClick = ({ wellIds }) => {
    const data = {
      plateId: this.props.plate.id,
      wellIds,
    };
    const { clickMode } = this.props;
    if (clickMode === 'apply') {
      this.props.applySelectedToolComponentsToWells(data);
    }
    if (clickMode === 'clear') {
      this.props.clearWells(data);
    }
    if (clickMode === 'select') {
      this.props.toggleWellsSelected(data);
    }
  };
  render() {
    const { plate, settings } = this.props;
    return (
      <div className={styles.plate}>
        <div>
          <Details />
        </div>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell}>
            <Settings />
          </div>
          <ColumnHeader
            ref={this.columnHeaderRef}
            plate={plate}
            wellSize={settings.wellSize}
            onClick={this.handleClick}
          />
        </div>
        <div className={styles.body}>
          <RowHeader
            ref={this.rowHeaderRef}
            plate={plate}
            wellSize={settings.wellSize}
            onClick={this.handleClick}
          />
          <Scrollbars
            style={{ height: '100%', width: '100%' }}
            onScrollFrame={this.handleScroll}
          >
            <Wells
              plate={plate}
              settings={settings}
              onWellClick={this.handleClick}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Plate.propTypes = {
  plate: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { settings, clickMode } = state.designExperiment;
  return { plate: activePlate, settings, clickMode };
};

const mapDispatch = {
  toggleWellsSelected,
  applySelectedToolComponentsToWells,
  clearWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(Plate);
export { connected as Plate };
