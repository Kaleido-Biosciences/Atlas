import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import { Button } from 'semantic-ui-react';

export class PrintActions extends Component {
  render() {
    return (
      <ReactToPrint
        trigger={() => (
          <Button size="mini" icon="print" content="Print" color="blue" />
        )}
        content={() => this.props.contentRef}
      />
    );
  }
}

PrintActions.propTypes = {
  contentRef: PropTypes.object,
};
