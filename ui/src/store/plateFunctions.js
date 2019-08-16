import {
  PLATEMAP_ROW_HEADERS,
  DEFAULT_TIMEPOINT_TIME,
  DEFAULT_TIMEPOINT_CONCENTRATION,
  DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION,
  DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION,
} from '../constants';

import {
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
} from '../api';

export function getActivePlateMap(plateMaps) {
  if (plateMaps.length > 0) {
    return plateMaps.find(plateMap => plateMap.active);
  } else return null;
}

export function getSelectedWells(plateMap) {
  const flat = plateMap.data.flat();
  return flat.filter(well => well.selected);
}

export function applySelectedComponentsToWells(plateMap, wellIds, components) {
  const wells = plateMap.data.flat();
  const filteredWells = wells.filter(well => {
    return wellIds.includes(well.id);
  });
  const updatedWells = [];
  filteredWells.forEach(well => {
    components.forEach(component => {
      if (component.selected) {
        const existingComponent = well.components.find(
          comp => comp.id === component.id
        );
        const { selected, editing, ...wellComponent } = component;
        if (!existingComponent) {
          well.components.push(wellComponent);
        } else {
          const existingTimepoints = existingComponent.timepoints;
          wellComponent.timepoints.forEach(newTimepoint => {
            const index = existingTimepoints.findIndex(
              eTimepoint => eTimepoint.time === newTimepoint.time
            );
            if (index > -1) {
              existingTimepoints.splice(index, 1, newTimepoint);
            } else {
              existingTimepoints.push(newTimepoint);
            }
          });
        }
      }
    });
    updatedWells.push(well);
  });
  return updatedWells;
}

export function findPlateMapById(id, plateMaps) {
  return plateMaps.find((plateMap, i) => {
    return plateMap.id === id;
  });
}

export function createWell(id, name, index, components = []) {
  return {
    id,
    name,
    index,
    components,
    selected: false,
    blank: false,
    highlighted: false,
    dimmed: false,
  };
}

export function createPlateMap(data, id) {
  return {
    selected: false,
    active: false,
    data,
    id: id || null,
  };
}

export function createPlateMapWithDimensions(dimensions) {
  return createPlateMap(createPlateMapData(dimensions));
}

export function createPlateMapData(dimensions) {
  const { rows, columns } = dimensions;
  const data = [];
  let wellCount = 0;
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = PLATEMAP_ROW_HEADERS[i];
    for (let i = 0; i < columns; i++) {
      const id = `${rowLetter}${i + 1}`;
      row.push(createWell(id, id, wellCount));
      wellCount++;
    }
    data.push(row);
  }
  return data;
}

export function createComponent(data, type) {
  let id, displayName;
  if (type === 'community') {
    id = `COMMUNITY_${data.id}`;
    displayName = data.name;
  } else if (type === 'compound') {
    id = `COMPOUND_${data.id}`;
    displayName = data.name;
  } else if (type === 'medium') {
    id = `MEDIUM_${data.id}`;
    displayName = data.name;
  } else if (type === 'supplement') {
    id = `SUPPLEMENT_${data.id}`;
    displayName = data.name.label;
  }
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

export function exportPlateMaps(plateMaps) {
  return plateMaps.map(plateMap => {
    return {
      id: plateMap.id,
      data: plateMap.data.map(row => {
        return row.map(col => {
          const well = col;
          return {
            id: well.id,
            components: well.components.map(component => {
              return {
                type: component.type,
                id: component.data.id,
                timepoints: component.timepoints,
              };
            }),
          };
        });
      }),
    };
  });
}

export async function importPlateMaps(plateMaps) {
  if (plateMaps) {
    const components = await fetchComponentsForPlateMaps(plateMaps);
    const stateMaps = plateMaps.map(plateMap => {
      let wellIndex = 0;
      const stateData = plateMap.data.map(rows => {
        return rows.map(well => {
          const stateComponents = well.components.map(component => {
            const lookup = components[component.type];
            const data = lookup.find(data => data.id === component.id);
            const stateComponent = createComponent(data, component.type);
            stateComponent.timepoints = component.timepoints;
            return stateComponent;
          });
          const stateWell = createWell(
            well.id,
            well.id,
            wellIndex,
            stateComponents
          );
          wellIndex++;
          return stateWell;
        });
      });
      return createPlateMap(stateData, plateMap.id);
    });
    if (stateMaps.length) {
      stateMaps[0].active = true;
    }
    return stateMaps;
  } else return null;
}

async function fetchComponentsForPlateMaps(plateMaps) {
  const components = {
    community: [],
    compound: [],
    medium: [],
    supplement: [],
  };
  plateMaps.forEach(plateMap => {
    const wells = plateMap.data.flat();
    wells.forEach(well => {
      well.components.forEach(component => {
        const cType = component.type;
        if (!components[cType].includes(component.id)) {
          components[cType].push(component.id);
        }
      });
    });
  });
  const response = {
    community: [],
    compound: [],
    medium: [],
    supplement: [],
  };
  let promises, results;
  promises = components.community.map(id => {
    return fetchCommunity(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.community.push(result.data);
  });
  promises = components.compound.map(id => {
    return fetchCompound(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.compound.push(result.data);
  });
  promises = components.medium.map(id => {
    return fetchMedium(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.medium.push(result.data);
  });
  promises = components.supplement.map(id => {
    return fetchSupplement(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.supplement.push(result.data);
  });
  return response;
}
