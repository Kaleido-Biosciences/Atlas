import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};
  if (!values.experiment) {
    errors.experiment = 'Experiment is required';
  }
  if (!values.communities || !values.communities.length) {
    errors.communities = 'At least one community is required';
  }
  if (!values.compounds || !values.compounds.length) {
    errors.compounds = 'At least one compound is required';
  }
  if (!values.media || !values.media.length) {
    errors.media = 'At least one media is required';
  }
  return errors;
};

const renderSelect = field => (
  <Form.Field error={field.meta.touched && field.meta.error ? true : false}>
    <label>{field.label}</label>
    <Dropdown
      placeholder={field.placeholder}
      fluid
      search
      selection
      value={field.input.value}
      options={field.options}
      onChange={(e, { value }) => field.input.onChange(value)}
    />
    {field.meta.touched &&
      ((field.meta.error && <span>{field.meta.error}</span>) ||
        (field.meta.warning && <span>{field.meta.warning}</span>))}
  </Form.Field>
);

const renderMultiSelect = field => (
  <Form.Field error={field.meta.touched && field.meta.error ? true : false}>
    <label>{field.label}</label>
    <Dropdown
      placeholder={field.placeholder}
      fluid
      search
      multiple
      selection
      value={field.input.value}
      options={field.options}
      onChange={(e, { value }) => field.input.onChange(value)}
    />
    {field.meta.touched &&
      ((field.meta.error && <span>{field.meta.error}</span>) ||
        (field.meta.warning && <span>{field.meta.warning}</span>))}
  </Form.Field>
);

class NewExperimentForm extends Component {
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
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={renderSelect}
          label="Experiment"
          name="experiment"
          placeholder="Experiment"
          options={this.experiments}
        />
        <Field
          component={renderMultiSelect}
          label="Communities"
          name="communities"
          placeholder="Communities"
          options={this.communities}
        />
        <Field
          component={renderMultiSelect}
          label="Compounds"
          name="compounds"
          placeholder="Compounds"
          options={this.compounds}
        />
        <Field
          component={renderMultiSelect}
          label="Media"
          name="media"
          placeholder="Media"
          options={this.media}
        />
        <Form.Group inline>
          <Form.Button primary>Submit</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

NewExperimentForm.propTypes = {
  experiments: PropTypes.array.isRequired,
  communities: PropTypes.array.isRequired,
  compounds: PropTypes.array.isRequired,
  media: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const wrapped = reduxForm({
  form: 'newExperiment',
  validate,
})(NewExperimentForm);
export { wrapped as NewExperimentForm };
