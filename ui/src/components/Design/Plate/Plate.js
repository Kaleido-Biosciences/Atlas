import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import { selectActivePlate } from '../../../store/selectors';
import { ColumnHeader } from './ColumnHeader';
import { RowHeader } from './RowHeader';
import { Wells } from './Wells';
import styles from './Plate.module.css';

class Plate extends Component {
  columnHeaderRef = React.createRef();
  rowHeaderRef = React.createRef();
  handleScroll = values => {
    this.columnHeaderRef.current.setScrollPos(values.scrollLeft);
    this.rowHeaderRef.current.setScrollPos(values.scrollTop);
  };
  render() {
    const { plate } = this.props;
    return (
      <div className={styles.plate}>
        <div className={styles.topHeader}>
          <div className={styles.cornerCell}></div>
          <ColumnHeader ref={this.columnHeaderRef} plate={plate} />
        </div>
        <div className={styles.body}>
          <RowHeader ref={this.rowHeaderRef} plate={plate} />
          <Scrollbars
            style={{ height: '100%', width: '100%' }}
            onScrollFrame={this.handleScroll}
          >
            <Wells plate={plate} />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Plate.propTypes = {
  plate: PropTypes.object.isRequired,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  return { plate: activePlate };
};

const mapDispatch = {};

const connected = connect(
  mapState,
  mapDispatch
)(Plate);
export { connected as Plate };
