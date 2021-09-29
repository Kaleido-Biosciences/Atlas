import sampleJson from './sample.json';
import { createPlate } from 'models';
import { fetchActivityData, createActivityData } from './aws';

export async function fetchActivity(id) {
  let activityData = await fetchActivityData(id);
  if (!activityData) {
    createActivityData(id, sampleJson);
    activityData = sampleJson;
  }
  const { platemaps: plateMaps, ...rest } = activityData;
  const activity = { ...rest, plates: [] };
  if (plateMaps) {
    activity.plates = plateMaps.map((plateMap) => {
      return createPlate({
        id: plateMap.id,
        name: plateMap.name || 'Untitled',
        barcode: plateMap.barcode,
        sortKey: plateMap.plateNumber,
      });
    });
  }
  return activity;
}
