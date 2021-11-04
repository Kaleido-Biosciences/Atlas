import { COMPONENT_TYPE_ATTRIBUTE } from './constants';

export const getName = (data) => {
  let name = data.name;
  if (data.alias) {
    name += ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    data.aliases.forEach(
      (aliasElement) => (name += ` : (${aliasElement.alias})`)
    );
  }
  return name;
};

export const getDefaultTimepoints = (concentration, time) => {
  return [
    {
      concentration,
      concentrationUnitId: null,
      concentrationUnitAbbreviation: '',
      time,
      timeUnitId: null,
      timeUnitAbbreviation: '',
    },
  ];
};

export const getDescription = (component) => {
  let description = '';
  if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
    description = component.fields.value_type;
    if (description === 'Float') {
      description = 'Decimal';
    } else if (description === 'String') {
      description = 'Text';
    } else if (description === 'Boolean') {
      description = 'True/False';
    }
  } else {
    if (
      component.isValid &&
      component.fields &&
      component.fields.timepoints &&
      component.fields.timepoints.length
    ) {
      description = getTimepointsString(component.fields.timepoints);
    }
  }
  return description;
};

export const getTimepointsString = (timepoints) => {
  const timepointStrings = timepoints.map((timepoint) => {
    const timeString = `@ ${timepoint.time} ${timepoint.timeUnitAbbreviation}`;
    if (timepoint.concentration) {
      return `${timepoint.concentration.toFixed(2)} ${
        timepoint.concentrationUnitAbbreviation
      } ${timeString}`;
    } else return timeString;
  });
  return timepointStrings.join(', ');
};
