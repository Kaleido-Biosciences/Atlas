import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';
import { AddAttributeComponent } from "../../ComponentList/AddAttributeComponent";

export class AttributesSection extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <React.Fragment>
        <ComponentsSection
          label={'Attribute'}
          labelDescription={'Use attribute to include exploratory meta data'}
          components={attributes}
          showTimepoints={false}
          allowTimepointTimeChange={false}
          allowAddTimepoint={false}
        />
        <AddAttributeComponent onAddClick={this.props.addAttribute} defaultValueType={'Boolean'}/>
      </React.Fragment>
    );
  }
}

AttributesSection.propTypes = {
  attributes: PropTypes.array,
  addAttribute: PropTypes.func,
};
