import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import { Loader, Message } from 'semantic-ui-react';

// import { PlateTabBar } from '../PlateTabBar';
// import { Plate, NoPlatesMessage } from '../Plate';
// import { PlateSidebar } from '../PlateSidebar';
import styles from './Editor.module.css';

export class Editor extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.location.search);
    }
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  render() {
    const { loading, error, initialized, noPlates } = this.props;
    let content;
    if (loading) {
      content = (
        <div className={styles.loader}>
          <Loader active inline="centered">
            Importing containers
          </Loader>
        </div>
      );
    } else if (error) {
      content = (
        <Message
          negative
          className={styles.errorMessage}
          icon="warning circle"
          header="An error occurred while importing containers:"
          content={error}
        />
      );
    } else if (initialized) {
      content = (
        <React.Fragment>
          <div className={styles.container}>
            <SplitPane
              primary="second"
              defaultSize={300}
              minSize={200}
              pane1Style={{ overflow: 'hidden' }}
              pane2Style={{ height: '100%' }}
            >
              <div className={styles.mainContainer}>
                <div className={styles.plateTabContainer}>
                  {/* <PlateTabBar /> */}
                </div>
                <div className={styles.plateContainer}>
                  {/* {noPlates ? (
                    <NoPlatesMessage onAddClick={this.props.onAddClick} />
                  ) : (
                    <Plate />
                  )} */}
                </div>
              </div>
              {/* <PlateSidebar /> */}
            </SplitPane>
          </div>
        </React.Fragment>
      );
    }
    return <div className={styles.editor}>{content}</div>;
  }
}

Editor.propTypes = {
  location: PropTypes.object,
  loading: PropTypes.bool,
  initialized: PropTypes.bool,
  error: PropTypes.string,
  noPlates: PropTypes.bool,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  onAddClick: PropTypes.func,
};
