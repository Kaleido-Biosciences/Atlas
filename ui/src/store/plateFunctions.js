import {
  DEFAULT_TIMEPOINT_TIME,
  DEFAULT_TIMEPOINT_CONCENTRATION,
  DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION,
  DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION,
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from '../constants';

export function createComponent(data, type) {
  const displayName = getDisplayName(data);
  const id = `${type.toUpperCase()}_${data.id}`;
  const timepoints = [createTimepoint(type)];
  return {
    id,
    displayName,
    type,
    data,
    selected: true,
    isValid: true,
    timepoints,
  };
}

/**
 * This function is designed to get the display name. Ultimately this logic will be handled by the search endpoint
 * @param data The component/data object
 * @returns {*}
 */
export function getDisplayName(data) {
  let displayName = data.name;
  if (data.alias) {
    //For communities
    displayName = displayName + ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    //This is for compounds
    data.aliases.forEach(
      (aliasElement) => (displayName += ` : (${aliasElement.alias})`)
    );
  }
  return displayName;
}

export function createTimepoint(
  componentType,
  time = DEFAULT_TIMEPOINT_TIME,
  concentration
) {
  if (!concentration && componentType) {
    if (componentType === 'community') {
      concentration = DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION;
    } else if (componentType === 'medium') {
      concentration = DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION;
    } else {
      concentration = DEFAULT_TIMEPOINT_CONCENTRATION;
    }
  } else if (!concentration) {
    concentration = DEFAULT_TIMEPOINT_CONCENTRATION;
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
