import sampleJson from './sample.json';
import plateTypesJson from './plateTypes.json';
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
    activity.plates = plateMaps.map((plateMap) => createPlate(plateMap));
  }
  return activity;
}

export async function fetchPlateTypes() {
  return plateTypesJson;
}
