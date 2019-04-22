import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';

import { plateRowHeaders } from '../constants';

export class Platemap extends Component {
  renderTable(platemap) {
    const rows = platemap.map((row, i) => {
      const columns = row.map((well, j) => {
        return (
          <td key={j + 1}>
            <div className="well">well</div>
          </td>
        );
      });
      columns.unshift(<th key={0}>{plateRowHeaders[i]}</th>);
      return <tr key={i + 1}>{columns}</tr>;
    });

    const topHeaderCells = platemap[0].map((well, i) => {
      return <th key={i + 1}>{i + 1}</th>;
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
  handleDelete = () => {
    this.props.onDelete(this.props.platemap.id);
  };
  render() {
    const { platemap, numberOfPlateMaps } = this.props;
    if (platemap) {
      return (
        <div style={{ border: '1px solid black' }}>
          <div>{platemap.id}</div>
          <Button primary onClick={this.handleDelete}>
            Delete
          </Button>
          {this.renderTable(platemap.map)}
        </div>
      );
    } else if(!numberOfPlateMaps) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="grid layout" />
            There are no plate maps in this experiment
          </Header>
          <Button primary>Add Plate Map</Button>
        </Segment>
      );
    }
  }
}

Platemap.propTypes = {
  platemap: PropTypes.object,
  numberOfPlateMaps: PropTypes.number.isRequired,
  addPlate: PropTypes.func.isRequired,
  deletePlate: PropTypes.func.isRequired,
};
