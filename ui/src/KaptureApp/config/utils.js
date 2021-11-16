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

export function getDefaultTimepoints(concentration, time) {
  return [
    {
      concentration,
      concentrationUnit: null,
      time,
      timeUnit: null,
    },
  ];
}

export const getDescription = (component) => {
  let description = '';
  if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
    const { value, valueUnit } = component.form;
    if (value !== '') {
      if (value === true) description = 'True';
      else if (value === false) description = 'False';
      else description = `${value}`;
      if (valueUnit) {
        description += ` ${valueUnit.abbreviation}`;
      }
    } else description = '';
  } else {
    if (
      !component.form.errors.length &&
      component.form &&
      component.form.timepoints &&
      component.form.timepoints.length
    ) {
      description = getTimepointsString(component.form.timepoints);
    }
  }
  return description;
};

export const getTimepointsString = (timepoints) => {
  const timepointStrings = timepoints.map((timepoint) => {
    let timeString = '',
      concString = '';
    if (timepoint.time || timepoint.time === 0) {
      timeString = `@ ${timepoint.time}`;
      if (timepoint.timeUnit) {
        timeString += ` ${timepoint.timeUnit.abbreviation}`;
      }
    }
    if (timepoint.concentration) {
      concString = `${timepoint.concentration.toFixed(2)}`;
      if (timepoint.concentrationUnit) {
        concString += ` ${timepoint.concentrationUnit.abbreviation}`;
      }
    }
    return `${concString} ${timeString}`;
  });
  return timepointStrings.join(', ');
};

export const exportComponent = (component) => {
  return {
    type: component.type,
    id: component.data.id,
    fields: {
      timepoints: component.form.timepoints.map((timepoint) => {
        return {
          concentration: timepoint.concentration,
          concentrationUnit: timepoint.concentrationUnit,
          time: timepoint.time,
          timeUnit: timepoint.timeUnit,
        };
      }),
    },
  };
};
