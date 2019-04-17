import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';

export class NewExperimentForm extends Component {
  constructor(props) {
    super(props);
    this.experiments = props.experiments.slice(0, 50).map((exp, i) => {
      return { key: i, text: exp.name, value: exp.name };
    });
    this.communities = props.communities.slice(0, 50).map((comm, i) => {
      return { key: i, text: comm.name, value: comm.name };
    });
    this.compounds = props.compounds.slice(0, 50).map((comp, i) => {
      return { key: i, text: comp.alias, value: comp.alias };
    });
    this.media = props.media.slice(0, 50).map((media, i) => {
      return { key: i, text: media.name, value: media.name };
    });
    this.state = {
      experiment: '',
      communities: [],
      compounds: [],
      media: [],
    };
  }

  handleChange = key => (e, { value }) => {
    const change = {};
    change[key] = value;
    this.setState(change);
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div>
        <Dropdown
          placeholder="Experiment"
          fluid
          search
          selection
          options={this.experiments}
          onChange={this.handleChange('experiment')}
        />
        <Dropdown
          placeholder="Communities"
          fluid
          search
          multiple
          selection
          options={this.communities}
          onChange={this.handleChange('communities')}
        />
        <Dropdown
          placeholder="Compounds"
          fluid
          search
          multiple
          selection
          options={this.compounds}
          onChange={this.handleChange('compounds')}
        />
        <Dropdown
          placeholder="Media"
          fluid
          search
          multiple
          selection
          options={this.media}
          onChange={this.handleChange('media')}
        />
        <Form.Group inline>
          <Form.Button primary onClick={this.handleSubmit}>
            Submit
          </Form.Button>
        </Form.Group>
      </div>
    );
  }
}
