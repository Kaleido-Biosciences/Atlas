import sampleJson from './sample.json';
import { createPlate } from 'models';
import { fetchActivityData, createActivityData } from './aws';

export async function fetchActivity(id) {
  // let activityData = await fetchActivityData(id);
  // if (!activityData) {
  //   createActivityData(id, sampleJson);
  //   activityData = sampleJson;
  // }
  let activityData = sampleJson;
  const { platemaps: plateMaps, ...rest } = activityData;
  const activity = { ...rest, plates: [] };
  if (plateMaps) {
    plateMaps.sort((a, b) => {
      if (a.barcode === b.barcode) return 0;
      else if (a.barcode < b.barcode) return -1;
      else return 1;
    });
    let unpositionedCount = 0;
    plateMaps.forEach((plateMap, i) => {
      if (
        isNaN(plateMap.overviewPositionTop) &&
        isNaN(plateMap.overviewPositionLeft)
      ) {
        plateMap.overviewPositionTop = (unpositionedCount + 1) * 10;
        plateMap.overviewPositionLeft = 10;
        unpositionedCount++;
      }
    });
    activity.plates = plateMaps.map((plateMap) => createPlate(plateMap));
  }
  return activity;
}
