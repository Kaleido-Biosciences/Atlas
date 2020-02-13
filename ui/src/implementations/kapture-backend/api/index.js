import {
  searchActivities,
  fetchExperiment,
  fetchCommunity,
  fetchCompound,
  fetchMedium,
  fetchSupplement,
} from './kapture';
import {
  fetchExperimentVersions,
  fetchVersion,
  publishExperimentPlates,
  saveExperimentPlates,
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
  saveExperimentPlates,
};
