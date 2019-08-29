import React, { Component } from 'react';
import { Form, TextArea, Button, Progress } from 'semantic-ui-react';

import { api } from '../../api';
import styles from './ImportComponents.module.css';

export class ImportComponents extends Component {
  currentSearchIndex = 0;
  state = {
    searchTerms: [],
    found: [],
    notFound: [],
  };
  handleChange = (e, data) => {
    const searchTerms = data.value.trim().split(/\r|\n/);
    this.setState({ searchTerms, found: [], notFound: [] });
  };
  searchNext = async () => {
    const index = this.currentSearchIndex;
    const result = await api.kapture.findComponent(
      this.state.searchTerms[index]
    );
    console.log(result);
    if (result.found) {
      this.setState({ found: this.state.found.concat(result) });
    } else {
      this.setState({ notFound: this.state.notFound.concat(result) });
    }
    this.currentSearchIndex++;
    if (this.state.searchTerms[this.currentSearchIndex]) {
      this.searchNext();
    }
  };
  import = () => {
    this.currentSearchIndex = 0;
    this.searchNext();
  };
  render() {
    const { searchTerms } = this.state;
    const currentSearch = this.currentSearchIndex + 1;
    return (
      <div className={styles.importComponents}>
        <div>
          <Form>
            <TextArea
              placeholder="Enter components"
              onChange={this.handleChange}
            />
          </Form>
        </div>
        <div>
          <Button onClick={this.import}>Import Components</Button>
          <Progress
            value={currentSearch}
            total={searchTerms.length}
            progress="ratio"
          />
          <div className={styles.searchResults}>
            <div className={styles.found}>
              {this.state.found.length}
              {this.state.found.map(result => {
                return <div key={result.name}>{result.name}</div>;
              })}
            </div>
            <div className={styles.notFound}>
              {this.state.notFound.length}
              {this.state.notFound.map(result => {
                return <div key={result.name}>{result.name}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
