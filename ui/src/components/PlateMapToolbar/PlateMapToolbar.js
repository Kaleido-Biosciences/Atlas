import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import {
  createExperimentActions,
  addNewPlateMap,
  clonePlateMap,
  selectActivePlateMap,
} from '../../store/createExperiment';
import { PlateMapDropdown } from './PlateMapDropdown';
import { DeletePlateMapButton } from './DeletePlateMapButton';
import { ClonePlateMapButton } from './ClonePlateMapButton';
import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import { STATUS_COMPLETED } from '../../constants';
import styles from './PlateMapToolbar.module.css';

class PlateMapToolbar extends Component {
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
    }
  };
  handleDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.activePlateMap.id);
    }
  };
  handleHighlight = (e, { value }) => {
    if (this.props.onHighlightClick) {
      this.props.onHighlightClick({ componentType: value });
    }
  };
  handleCloneSubmit = ({ typesToClone }) => {
    if (this.props.onCloneSubmit) {
      this.props.onCloneSubmit(this.props.activePlateMap.id, typesToClone);
    }
  };
  handleMarkAsCompleted = () => {
    if (this.props.onMarkAsCompleted) {
      this.props.onMarkAsCompleted();
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  };
  render() {
    const { plateMaps, activePlateMap, status } = this.props;
    return (
      <div className={styles.toolbar}>
        <div className={styles.dropdownContainer}>
          <PlateMapDropdown
            plateMaps={plateMaps}
            activePlateMap={activePlateMap}
            onChange={this.props.onPlateMapChange}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            primary
            icon="plus circle"
            content="Add Plate"
            onClick={this.handleAddClick}
          />
          <DeletePlateMapButton onConfirm={this.handleDelete} />
          <ClonePlateMapButton onSubmit={this.handleCloneSubmit} />
          <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
        </div>
        {/* <div className={styles.highlight}>
          <Form>
            <Form.Group inline>
              <label>Highlight wells containing:</label>
              <Form.Field>
                <Checkbox
                  label="Communities"
                  value="communities"
                  onClick={this.handleHighlight}
                  checked={highlightedComponents.includes('communities')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="Compounds"
                  value="compounds"
                  onClick={this.handleHighlight}
                  checked={highlightedComponents.includes('compounds')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="Media"
                  value="media"
                  onClick={this.handleHighlight}
                  checked={highlightedComponents.includes('media')}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </div> */}
      </div>
    );
  }
}

PlateMapToolbar.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object.isRequired,
  highlightedComponents: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  onPlateMapChange: PropTypes.func,
  onDelete: PropTypes.func,
  onHighlightClick: PropTypes.func,
  onAddClick: PropTypes.func,
  onCloneSubmit: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const { plateMaps, highlightedComponents, status } = state.createExperiment;
  const activePlateMap = selectActivePlateMap(state);
  return { plateMaps, highlightedComponents, activePlateMap, status };
};

const mapDispatch = {
  onPlateMapChange: createExperimentActions.setActivePlateMap,
  onDelete: createExperimentActions.deletePlateMap,
  onHighlightClick: createExperimentActions.toggleHighlight,
  onAddClick: addNewPlateMap,
  onCloneSubmit: clonePlateMap,
  onMarkAsCompleted: createExperimentActions.setCompletedStatus,
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateMapToolbar);
export { connected as PlateMapToolbar };
