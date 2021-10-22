import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Scrollbars } from 'KaptureApp/components';
import { Well } from './Well';
import styles from './PlateTable.module.css';

export class PlateTable extends Component {
  handleWellClick = (well) => {
    const plate = this.props.plates.find((plate) => plate.selected);
    if (this.props.onWellClick) {
      this.props.onWellClick([well.id], [plate.id], this.props.view.id);
    }
  };
  handlePlateChange = (plateId) => {
    this.props.onPlateChange([plateId]);
  };
  handleRemoveComponent = (wellId, componentId) => {
    if (this.props.onRemoveComponent) {
      const plate = this.props.plates.find((plate) => plate.selected);
      this.props.onRemoveComponent(plate.id, wellId, componentId);
    }
  };
  renderPlate(plate) {
    if (plate.wells && plate.wells.length > 0) {
      return plate.wells.map((well, i) => {
        return (
          <Well
            darkBackground={i % 2 === 1}
            enableRemoveComponent={this.props.enableRemoveComponent}
            key={well.id}
            onClick={this.handleWellClick}
            onRemoveComponent={this.handleRemoveComponent}
            well={well}
          />
        );
      });
    } else return null;
  }
  render() {
    const plate = this.props.plates.find((plate) => plate.selected);
    return (
      <div className={styles.plateTable}>
        <Header
          onPlateChange={this.handlePlateChange}
          onSaveName={this.props.onSaveName}
          plates={this.props.plates}
        />
        <div className={styles.scrollContainer}>
          <Scrollbars>
            {plate ? (
              <table className="h-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Well
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Components
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderPlate(plate)}</tbody>
              </table>
            ) : null}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

PlateTable.propTypes = {
  enableRemoveComponent: PropTypes.bool,
  onRemoveComponent: PropTypes.func,
  onSaveName: PropTypes.func,
  onWellClick: PropTypes.func,
  plates: PropTypes.array,
  view: PropTypes.object.isRequired,
};
