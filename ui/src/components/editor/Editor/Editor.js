import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import { Loader, Message } from 'semantic-ui-react';

import { EditorEmptyState } from './EditorEmptyState';
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
    const {
      loading,
      error,
      initialized,
      showEmptyState,
      tabsComponent,
      activeGridComponent,
      componentListComponent,
      toolsComponent,
    } = this.props;
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
                <div className={styles.tabsContainer}>{tabsComponent}</div>
                <div className={styles.activeGridContainer}>
                  {showEmptyState ? <EditorEmptyState /> : activeGridComponent}
                </div>
              </div>
              <div className={styles.sidebar}>
                <SplitPane
                  split="horizontal"
                  defaultSize={250}
                  pane2Style={{ overflow: 'hidden' }}
                >
                  {componentListComponent}
                  {toolsComponent}
                </SplitPane>
              </div>
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
  showEmptyState: PropTypes.bool,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  onAddClick: PropTypes.func,
  tabsComponent: PropTypes.object,
  activeGridComponent: PropTypes.object,
  componentListComponent: PropTypes.object,
  toolsComponent: PropTypes.object,
};
