import React, { Component } from 'react';
import { Input, Button, Select } from 'semantic-ui-react';
import { api } from 'KaptureApp/api';
import pako from 'pako';
import axios from 'axios';

export class FetchTest extends Component {
  state = { searchText: '', versions: null, compressedGrids: null };
  handleInputChange = (e, { value }) => {
    this.setState({ searchText: value, versions: null, compressedGrids: null });
  };
  handleSearch = async () => {
    const experimentId = this.state.searchText.toUpperCase();
    const versions = await api.fetchActivityVersions(experimentId);
    console.log('Processed versions (new structure)\n', versions);
    this.setState({ versions });
  };
  handleSelectChange = (e, { value }) => {
    const version = this.state.versions.find((version) => {
      return version.experiment_status === value;
    });
    const compressed = this.compressGrids(version.plateMaps);
    console.log('Compressed/encoded platemaps:');
    console.log(compressed);
    this.setState({ compressedGrids: compressed });
  };
  handleSave = () => {
    const body = {
      activityName: this.state.searchText.toUpperCase(),
      data: this.state.compressedGrids,
    };
    console.log('Save POST payload\n', body);
    axios.post('/activities/save', body);
  };
  handleSaveDraft = () => {
    const body = {
      activityName: this.state.searchText.toUpperCase(),
      data: this.state.compressedGrids,
    };
    console.log('Save Draft POST payload\n', body);
    axios.post('/activities/save/draft', body);
  };
  compressGrids(grids) {
    const gridsString = JSON.stringify(grids);
    const gzipped = pako.gzip(gridsString, { to: 'string' });
    return btoa(gzipped);
  }
  renderVersions() {
    const versions = this.state.versions;
    if (versions && versions.length) {
      const options = versions.map((version, i) => {
        return {
          key: version.experiment_status + i,
          value: version.experiment_status,
          text: version.experiment_status,
        };
      });
      return <Select options={options} onChange={this.handleSelectChange} />;
    } else return null;
  }
  renderSaveButtons() {
    if (this.state.compressedGrids) {
      return (
        <div>
          <Button onClick={this.handleSaveDraft}>Save Draft</Button>
          <Button onClick={this.handleSave}>Save</Button>
        </div>
      );
    } else return null;
  }
  render() {
    const style = { padding: '1em' };
    return (
      <div>
        <div style={style}>
          <Input
            value={this.state.searchText}
            onChange={this.handleInputChange}
          />
          <Button onClick={this.handleSearch}>Search</Button>
        </div>
        <div style={style}>{this.renderVersions()}</div>
        <div style={style}>{this.renderSaveButtons()}</div>
      </div>
    );
  }
}
