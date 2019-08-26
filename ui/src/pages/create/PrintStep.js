import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { Button, Icon } from 'semantic-ui-react';

import { setStepThreeComplete } from '../../store/experimentActions';
import { Printout } from '../../components/Printout/Printout';
import styles from './PrintStep.module.css';

class PrintStep extends Component {
  render() {
    const { experiment, plates } = this.props;
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <Button className={styles.printButton}>
              <Icon name="print" />
              Print
            </Button>
          )}
          onBeforePrint={this.props.onPrint}
          content={() => this.componentRef}
        />
        <Printout
          experiment={experiment}
          plates={plates}
          ref={el => (this.componentRef = el)}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const { experiment, plates } = state.designExperiment;
  return {
    experiment,
    plates,
  };
};

const mapDispatch = {
  onPrint: setStepThreeComplete,
};

const connected = connect(
  mapState,
  mapDispatch
)(PrintStep);
export { connected as PrintStep };
