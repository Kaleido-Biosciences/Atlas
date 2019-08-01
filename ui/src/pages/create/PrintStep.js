import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { Button, Icon } from 'semantic-ui-react';

import { Printout } from '../../components/Printout/Printout';
import styles from './PrintStep.module.css';

class PrintStep extends Component {
  render() {
    const { experiment, plateMaps } = this.props;
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <Button className={styles.printButton}>
              <Icon name="print" />
              Print
            </Button>
          )}
          content={() => this.componentRef}
        />
        <Printout
          experiment={experiment}
          plateMaps={plateMaps}
          ref={el => (this.componentRef = el)}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const { experiment, plateMaps } = state.createExperiment;
  return {
    experiment,
    plateMaps,
  };
};

const connected = connect(mapState)(PrintStep);
export { connected as PrintStep };
