import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

import styles from './EditorEmptyState.module.css';

export class EditorEmptyState extends Component {
  render() {
    return (
      <Segment placeholder className={styles.editorEmptyState}>
        <Header icon>
          <Icon name="grid layout" />
          <div>There are no containers in this activity.</div>
          <div>
            Get started by clicking the{' '}
            <Icon name="plus circle" className={styles.plusIcon} /> icon above.
          </div>
        </Header>
      </Segment>
    );
  }
}
