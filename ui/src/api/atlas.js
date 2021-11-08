import axios from 'axios';
import { API_URL } from 'KaptureApp/config/api';
import activityJSON from './activity.json';
import { exportComponent } from 'KaptureApp/config/componentTypes';

export async function searchActivities(searchTerm) {
  const response = await axios.get(
    API_URL + '/api/atlas/_search/experiments/' + searchTerm
  );
  return response.data;
}

export async function fetchActivity(name) {
  const response = await axios.get(
    API_URL + '/api/atlas/experiments/name/' + name
  );
  return { ...response.data, ...activityJSON };
}

export async function fetchPlateTypes() {
  const response = await axios.get(API_URL + '/api/atlas/platetypes');
  return response.data;
}

export async function searchComponents(searchTerm) {
  const response = await axios.get(
    API_URL + '/api/atlas/components/_search/' + searchTerm
  );
  return response.data;
}

export async function fetchConcentrationUnits() {
  const response = await axios.get(API_URL + '/api/atlas/units/concentration');
  return response.data;
}

export async function fetchTimeUnits() {
  const response = await axios.get(API_URL + '/api/atlas/units/time');
  return response.data;
}

export function exportPlates(plates) {
  return plates.map((plate) => {
    return exportPlate(plate);
  });
}

function exportPlate(plate) {
  const exportedPlate = {
    id: plate.id,
    barcode: plate.barcode,
    name: plate.name,
    plateNumber: plate.plateNumber,
    overviewPositionLeft: plate.overviewPositionLeft,
    overviewPositionTop: plate.overviewPositionTop,
    wells: [],
  };
  if (plate.wells) {
    exportedPlate.wells = plate.wells.map((well) => {
      const exportedWell = {
        row: well.row,
        column: well.column,
        components: [],
        attributes: [],
      };
      if (well.components && well.components.length) {
        exportedWell.components = well.components.map((component) =>
          exportComponent(component)
        );
      }
      return exportedWell;
    });
  }
  return exportedPlate;
}
