import sampleJson from './sample.json';
import { createGrid } from 'AtlasUI/models';
import { fetchActivityData, createActivityData } from './aws';

export async function fetchActivity(id) {
  let activityData = await fetchActivityData(id);
  if (!activityData) {
    createActivityData(id, sampleJson);
    activityData = sampleJson;
  }
  const { platemaps: plateMaps, ...rest } = activityData;
  const activity = { ...rest, grids: [] };
  if (plateMaps) {
    const grids = plateMaps.map((plateMap) => {
      return createGrid({
        id: plateMap.id,
        containerType: 'Plate',
        barcode: plateMap.barcode,
        name: plateMap.name || 'Untitled',
        sortKey: plateMap.plateNumber,
      });
    });
    activity.grids = grids;
  }
  return activity;
}
