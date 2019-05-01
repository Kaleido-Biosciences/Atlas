import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import { plateMapRowHeaders } from '../constants';
import { Well } from './Well';
import { PlateMapHeader } from './PlateMapHeader';

export class PlateMap extends Component {
  renderTable(plateMap) {
    const rows = plateMap.map((row, i) => {
      const columns = row.map((well, j) => {
        return (
          <td key={j + 1}>
            <Well onClick={this.handleWellClick} well={well} />
          </td>
        );
      });
      columns.unshift(
        <PlateMapHeader
          headerType="row"
          label={plateMapRowHeaders[i]}
          key={0}
          index={i}
          onClick={this.handleHeaderClick}
          className="row"
        />
      );
      return <tr key={i + 1}>{columns}</tr>;
    });

    const topHeaderCells = plateMap[0].map((well, i) => {
      return (
        <PlateMapHeader
          headerType="column"
          label={i + 1}
          key={i + 1}
          index={i}
          onClick={this.handleHeaderClick}
          className="column"
        />
      );
    });
    topHeaderCells.unshift(<td key="blank" />);
    rows.unshift(<tr key="topHeader">{topHeaderCells}</tr>);
    return (
      <div className="platemap-container">
        <table className="plate">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  handleHeaderClick = ({ headerType, index }) => {
    const { plateMap } = this.props;
    let wellIds;
    if (headerType === 'row') {
      const row = plateMap.data[index];
      wellIds = row.map(well => well.id);
    } else {
      wellIds = plateMap.data.map(row => row[index].id);
    }
    this.props.onWellsClick({
      plateMapId: this.props.plateMap.id,
      wellIds,
    });
  };
  handleWellClick = well => {
    this.props.onWellsClick({
      plateMapId: this.props.plateMap.id,
      wellIds: [well.id],
    });
  };
  handleDelete = () => {
    this.props.onDeleteClick(this.props.plateMap.id);
  };
  render() {
    const { plateMap } = this.props;
    return (
      <div className="platemap">
        <div className="platemap-toolbar">
          <div>
            <Button
              compact
              icon="trash"
              content="Delete"
              onClick={this.handleDelete}
            />
          </div>
        </div>
        {this.renderTable(plateMap.data)}
      </div>
    );
  }
}

PlateMap.propTypes = {
  plateMap: PropTypes.object.isRequired,
  onWellsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
