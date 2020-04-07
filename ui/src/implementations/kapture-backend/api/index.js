import {
  searchActivities,
  fetchExperiment,
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
  findComponent,
  searchComponents,
} from './kapture';
import {
  fetchExperimentVersions,
  fetchVersion,
  publishActivityGrids,
  saveActivityGrids,
} from './aws';
export const api = {
  searchActivities,
  fetchExperiment,
  fetchExperimentVersions,
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
