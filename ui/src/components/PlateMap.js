import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

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
    console.log(headerType, index);
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
      <div style={{ border: '1px solid black' }}>
        <div>{plateMap.id}</div>
        <Button primary onClick={this.handleDelete}>
          Delete
        </Button>
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
