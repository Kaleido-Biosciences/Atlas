import {
  searchActivities,
  fetchActivity,
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
  findComponent,
  searchComponents,
} from './kapture';
import {
  fetchActivityVersions,
  fetchVersion,
  publishActivityGrids,
  saveActivityGrids,
} from './aws';
export const api = {
  searchActivities,
  fetchActivity,
  fetchActivityVersions,
  fetchVersion,
  publishActivityGrids,
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
  saveActivityGrids,
  findComponent,
  searchComponents,
};
