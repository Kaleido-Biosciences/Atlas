import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
  COMPONENT_TYPES_KEYED,
} from 'KaptureApp/config/componentTypes';

export function createComponent(data, type, timepoints) {
  return {
    id: `${type.toUpperCase()}_${data.id}`,
    name: getName(data),
    type,
    data,
    selected: true,
    isValid: true,
    timepoints: timepoints || [createTimepoint(type)],
    tooltip: getComponentTooltip(data, type),
    color: COMPONENT_TYPES_KEYED[type].typeColor,
    abbreviation: COMPONENT_TYPES_KEYED[type].abbreviation,
  };
}

/**
 * This function is designed to get the display name. Ultimately this logic will be handled by the search endpoint
 * @param data The component/data object
 * @returns {*}
 */
export function getName(data) {
  let name = data.name;
  if (data.alias) {
    //For communities
    name += ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    //This is for compounds
    data.aliases.forEach(
      (aliasElement) => (name += ` : (${aliasElement.alias})`)
    );
  }
  return name;
}

export function createTimepoint(componentType, time, concentration) {
  const config = COMPONENT_TYPES_KEYED[componentType];
  if (!time) {
    time = config.defaultTime;
  }
  if (!concentration) {
    concentration = config.defaultConcentration;
  }
  return { time, concentration };
}

export function getComponentCounts(plates) {
  const counts = {};
  const allWells = plates
    .map((plate) => {
      return plate.wells.flat();
    })
    .flat();
  allWells.forEach((well) => {
    well.components.forEach((component) => {
      if (counts[component.id]) counts[component.id]++;
      else counts[component.id] = 1;
    });
  });
  return counts;
}

export const groupComponents = (components) => {
  const groups = {
    communities: [],
    compounds: [],
    media: [],
    supplements: [],
    attributes: [],
  };
  components.forEach((component) => {
    let key;
    if (component.type === COMPONENT_TYPE_COMMUNITY) {
      key = 'communities';
    } else if (component.type === COMPONENT_TYPE_COMPOUND) {
      key = 'compounds';
    } else if (component.type === COMPONENT_TYPE_MEDIUM) {
      key = 'media';
    } else if (component.type === COMPONENT_TYPE_SUPPLEMENT) {
      key = 'supplements';
    } else if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
      key = 'attributes';
    }
    groups[key].push(component);
  });
  return groups;
};

export function sortComponentsByType(components) {
  const sortValues = {
    [COMPONENT_TYPE_COMMUNITY]: 1,
    [COMPONENT_TYPE_COMPOUND]: 2,
    [COMPONENT_TYPE_MEDIUM]: 3,
    [COMPONENT_TYPE_SUPPLEMENT]: 4,
    [COMPONENT_TYPE_ATTRIBUTE]: 5,
  };
  const arrayToSort = components.slice(0);
  return arrayToSort.sort((a, b) => {
    return sortValues[a.type] - sortValues[b.type];
  });
}

const getComponentTooltip = (data, type) => {
  const tooltip = [];
  if (type === COMPONENT_TYPE_SUPPLEMENT) {
    if (data.source) {
      tooltip.push({ key: 'Source', value: data.source });
    }
    if (data.registrationDate) {
      tooltip.push({ key: 'Registration Date', value: data.registrationDate });
    }
  } else if (type === COMPONENT_TYPE_COMPOUND) {
    if (data.aveDP) {
      tooltip.push({
        key: 'Avg. DP',
        value: data.aveDP.toFixed(2),
      });
    }
    if (data.glycanComposition) {
      tooltip.push({
        key: 'Glycan Composition',
        value: data.glycanComposition,
      });
    }
    if (data.dataRecordName) {
      tooltip.push({ key: 'Data record name', value: data.dataRecordName });
    }
    if (data.createdBy) {
      tooltip.push({ key: 'Created by', value: data.createdBy });
    }
    if (data.dateCreated) {
      tooltip.push({
        key: 'Created date',
        value: formatDate(data.dateCreated),
      });
    }
    if (data.notes) {
      tooltip.push({ key: 'Notes', value: data.notes });
    }
  }
  return tooltip;
};

const formatDate = (iso_text) => {
  let d = new Date(iso_text),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
