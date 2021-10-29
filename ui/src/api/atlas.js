import axios from 'axios';
import { API_URL } from 'KaptureApp/config/api';
import activityJSON from './activity.json';
import plateTypesJSON from './plateTypes.json';

export async function fetchActivity(name) {
  const response = await axios.get(
    API_URL + '/api/atlas/experiments/name/' + name
  );
  return { ...response.data, ...activityJSON };
}

export async function fetchPlateTypes() {
  return plateTypesJSON;
}

export async function searchActivities(searchTerm) {
  const response = await axios.get(
    API_URL + '/api/atlas/_search/experiments/' + searchTerm
  );
  return response.data;
}
