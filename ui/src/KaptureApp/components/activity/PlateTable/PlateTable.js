import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Scrollbars } from 'KaptureApp/components';
import { Well } from './Well';
import styles from './PlateTable.module.css';

export class PlateTable extends Component {
  handleWellClick = (well) => {
    const { view } = this.props;
    if (this.props.onWellClick) {
      this.props.onWellClick(view.viewPlates[0].id, [well], view.id);
    }
  };
  renderPlate() {
    const viewPlate = this.props.view.viewPlates[0];
    const { plate, selectedWells } = viewPlate;
    return plate.wells.map((well, i) => {
      const selected = selectedWells.includes(well.name);
      return (
        <Well
          darkBackground={i % 2 === 1}
          key={well.name}
          onClick={this.handleWellClick}
          well={well}
          selected={selected}
        />
      );
    });
  }
  render() {
    const plate = this.props.view.viewPlates[0].plate;
    return (
      <div className={styles.plateTable}>
        <Header plate={plate} onSaveName={this.props.onSaveName} />
        <div className={styles.scrollContainer}>
          <Scrollbars>
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
              <tbody>{this.renderPlate()}</tbody>
            </table>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

PlateTable.propTypes = {
  view: PropTypes.object.isRequired,
  onSaveName: PropTypes.func,
  onWellClick: PropTypes.func,
};
