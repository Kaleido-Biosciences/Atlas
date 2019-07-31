import {
  PLATEMAP_ROW_HEADERS,
  DEFAULT_TIMEPOINT_TIME,
  DEFAULT_TIMEPOINT_CONCENTRATION,
  DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION,
  DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION,
} from '../constants';

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
    return wellIds.includes(well.id)
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

export function createPlateMap(data) {
  return {
    selected: false,
    active: false,
    data,
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
  const id = data.id;
  let displayName;
  if (type === 'community') {
    displayName = data.name;
  } else if (type === 'compound') {
    displayName = data.name;
  } else if (type === 'medium') {
    displayName = data.name;
  } else if (type === 'supplement') {
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
    const plateMapObj = {};
    const flat = plateMap.data.flat();
    flat.forEach(well => {
      plateMapObj[well.id] = well.components.map(component => {
        return {
          type: component.type,
          id: component.data.id,
          timepoints: component.timepoints,
        };
      });
    });
    return plateMapObj;
  });
}
