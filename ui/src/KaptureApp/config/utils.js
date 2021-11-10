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
    const { value, valueUnitId, units } = component.form.value;
    if (value !== '') {
      if (value === true) description = 'True';
      else if (value === false) description = 'False';
      else description = `${value}`;
      if (valueUnitId) {
        const unit = units.value.find((unit) => unit.id === valueUnitId);
        description += ` ${unit.abbreviation}`;
      }
    } else description = '';
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

export const exportComponent = (component) => {
  return {
    type: component.type,
    id: component.data.id,
    fields: {
      timepoints: component.fields.timepoints.map((timepoint) => {
        return {
          concentration: timepoint.concentration,
          concentrationUnitId: timepoint.concentrationUnitId,
          time: timepoint.time,
          timeUnitId: timepoint.timeUnitId,
        };
      }),
    },
  };
};
