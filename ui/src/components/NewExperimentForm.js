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
    errors.media = 'At least one medium is required';
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

const renderRadio = field => (
  <Form.Radio
    checked={field.input.value === field.radioValue}
    label={field.label}
    name={field.input.name}
    onChange={(e, { checked }) => field.input.onChange(field.radioValue)}
  />
);

class NewExperimentForm extends Component {
  render() {
    const {
      handleSubmit,
      experimentOptions,
      communityOptions,
      compoundOptions,
      mediumOptions,
      supplementOptions,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={renderSelect}
          label="Experiment"
          name="experiment"
          placeholder="Experiment"
          options={experimentOptions}
        />
        <Field
          component={renderMultiSelect}
          label="Communities"
          name="communities"
          placeholder="Communities"
          options={communityOptions}
        />
        <Field
          component={renderMultiSelect}
          label="Compounds"
          name="compounds"
          placeholder="Compounds"
          options={compoundOptions}
        />
        <Field
          component={renderMultiSelect}
          label="Media"
          name="media"
          placeholder="Media"
          options={mediumOptions}
        />
        <Field
          component={renderMultiSelect}
          label="Supplements"
          name="supplements"
          placeholder="Supplements"
          options={supplementOptions}
        />
        <Form.Group inline>
          <label>Plate Size</label>
          <Field
            component={renderRadio}
            label="96 wells"
            name="plateSize"
            radioValue={96}
          />
          <Field
            component={renderRadio}
            label="384 wells"
            name="plateSize"
            radioValue={384}
          />
        </Form.Group>
        <Form.Group inline>
          <Form.Button primary>Next</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

NewExperimentForm.propTypes = {
  experimentOptions: PropTypes.array.isRequired,
  communityOptions: PropTypes.array.isRequired,
  compoundOptions: PropTypes.array.isRequired,
  mediumOptions: PropTypes.array.isRequired,
  supplementOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const wrapped = reduxForm({
  form: 'newExperiment',
  validate,
})(NewExperimentForm);
export { wrapped as NewExperimentForm };
