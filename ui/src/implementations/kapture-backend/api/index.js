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
  publishExperimentPlates,
  saveActivityGrids,
} from './aws';
export const api = {
  searchActivities,
  fetchExperiment,
  fetchExperimentVersions,
  fetchVersion,
  publishExperimentPlates,
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
  saveActivityGrids,
  findComponent,
  searchComponents,
};
