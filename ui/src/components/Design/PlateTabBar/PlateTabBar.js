import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';

import { addNewPlate, setActivePlate } from '../../../store/experimentActions';
import { selectActivePlate } from '../../../store/selectors';
import { PlateTab } from './PlateTab';
import styles from './PlateTabBar.module.css';

class PlateTabBar extends Component {
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
    }
  };
  renderTabs() {
    const { plates, onTabClick } = this.props;
    if (plates && plates.length) {
      return plates.map((plate, i) => {
        return <PlateTab plate={plate} onClick={onTabClick}/>;
      });
    }
  }
  render() {
    return (
      <div className={styles.plateTabBar}>
        <Button icon onClick={this.handleAddClick}>
          <Icon name="plus circle" />
        </Button>
        {this.renderTabs()}
      </div>
    );
  }
}

PlateTabBar.propTypes = {
  plates: PropTypes.array,
  onAddClick: PropTypes.func,
  onTabClick: PropTypes.func,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { plates } = state.designExperiment;
  return { activePlate, plates };
};

const mapDispatch = {
  onAddClick: addNewPlate,
  onTabClick: setActivePlate,
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateTabBar);
export { connected as PlateTabBar };
