import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';
import {AddAttributeComponent} from "../../ComponentList/AddAttributeComponent";

export class AttributesSection extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <div>
      <ComponentsSection
        label="Attribute"
        components={attributes}
        showTimepoints={false}
        allowTimepointTimeChange={false}
        allowAddTimepoint={false}
      />
      <AddAttributeComponent onAddClick={this.props.addAttribute} defaultValueType={'Boolean'}/>
      </div>
    );
  }
}

AttributesSection.propTypes = {
  attributes: PropTypes.array,
  addAttribute: PropTypes.func,
};
