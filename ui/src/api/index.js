import axios from 'axios';
import { API_URL } from 'config/api';
import { ComponentService } from 'services/ComponentService';

export const api = {
  searchActivities: async function (searchTerm) {
    const response = await axios.get(
      API_URL + '/api/atlas/_search/experiments/' + searchTerm
    );
    return response.data;
  },
  fetchActivity: async function (name) {
    const response = await axios.get(API_URL + '/api/atlas/activity/' + name);
    return response.data;
  },
  deleteActivity: async function (name) {
    const response = await axios.delete(
      API_URL + '/api/atlas/activity/' + name
    );
    return response.data;
  },
  saveActivity: async function (name, plates) {
    const exportedPlates = exportPlates(plates);
    const postData = {
      name,
      plates: exportedPlates,
    };
    const response = await axios.post(
      API_URL + '/api/atlas/activity/' + name,
      postData
    );
    return response.data;
  },
  fetchPlateTypes: async function () {
    const response = await axios.get(API_URL + '/api/atlas/platetypes');
    return response.data;
  },
  setPlateType: async function (plateTypeSettings) {
    const response = await axios.post(
      API_URL + '/api/atlas/plate/setType',
      plateTypeSettings
    );
    return response.data;
  },
  searchComponents: async function (searchTerm) {
    const response = await axios.get(
      API_URL + '/api/atlas/components/_search/' + searchTerm
    );
    return response.data;
  },
};

function exportPlates(plates) {
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
        id: well.id,
        row: well.row,
        column: well.column,
        components: [],
      };
      if (well.components && well.components.length) {
        exportedWell.components = well.components.map((component) =>
          ComponentService.exportComponent(component)
        );
      }
      return exportedWell;
    });
  }
  return exportedPlate;
}
