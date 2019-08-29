import {
  PLATE_ROW_HEADERS,
  DEFAULT_TIMEPOINT_TIME,
  DEFAULT_TIMEPOINT_CONCENTRATION,
  DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION,
  DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION,
} from '../constants';

import { api } from '../api';
const {
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
} = api.kapture;

export function getActivePlate(plates) {
  if (plates.length > 0) {
    return plates.find(plate => plate.active);
  } else return null;
}

export function getSelectedWells(plate) {
  const wells = plate.wells.flat();
  return wells.filter(well => well.selected);
}

export function applySelectedComponentsToWells(plate, wellIds, components) {
  const wells = plate.wells.flat();
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

export function findPlateById(id, plates) {
  return plates.find((plate, i) => {
    return plate.id === id;
  });
}

export function createWell(id, name, index, components = []) {
  return {
    id,
    name,
    index,
    components,
    selected: false,
  };
}

export function createPlate(wells, id) {
  return {
    active: false,
    wells,
    id: id || null,
  };
}

export function createPlateWithDimensions(dimensions) {
  return createPlate(createPlateWells(dimensions));
}

export function createPlateWells(dimensions) {
  const { rows, columns } = dimensions;
  const wells = [];
  let wellCount = 0;
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = PLATE_ROW_HEADERS[i];
    for (let i = 0; i < columns; i++) {
      const id = `${rowLetter}${i + 1}`;
      row.push(createWell(id, id, wellCount));
      wellCount++;
    }
    wells.push(row);
  }
  return wells;
}

export function createComponent(data, type) {
  let id;
  const displayName = data.name;
  if (type === 'community') {
    id = `COMMUNITY_${data.id}`;
  } else if (type === 'compound') {
    id = `COMPOUND_${data.id}`;
  } else if (type === 'medium') {
    id = `MEDIUM_${data.id}`;
  } else if (type === 'supplement') {
    id = `SUPPLEMENT_${data.id}`;
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

export function exportPlates(plates) {
  return plates.map(plate => {
    return {
      id: plate.id,
      data: plate.wells.map(row => {
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

export async function importPlates(plates) {
  if (plates) {
    const components = await fetchComponentsForPlates(plates);
    const statePlates = plates.map(plate => {
      let wellIndex = 0;
      const stateWells = plate.data.map(rows => {
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
      return createPlate(stateWells, plate.id);
    });
    if (statePlates.length) {
      statePlates[0].active = true;
    }
    return statePlates;
  } else return null;
}

async function fetchComponentsForPlates(plates) {
  const components = {
    community: [],
    compound: [],
    medium: [],
    supplement: [],
  };
  plates.forEach(plate => {
    const wells = plate.data.flat();
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

export function getPlateSize(plate) {
  return {
    rows: plate.wells.length,
    columns: plate.wells[0].length,
  };
}
