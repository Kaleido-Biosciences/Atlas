import axios from 'axios';
import { API_URL } from 'KaptureApp/config/api';
import activityJSON from './activity.json';
import concentrationUnitsJSON from './concentrationUnits.json';
import timeUnitsJSON from './timeUnits.json';

export async function searchActivities(searchTerm) {
  const response = await axios.get(
    API_URL + '/api/atlas/_search/experiments/' + searchTerm
  );
  return response.data;
}

export async function fetchActivity(name) {
  const response = await axios.get(
    API_URL + '/api/atlas/experiments/name/' + name
  );
  return { ...response.data, ...activityJSON };
}

export async function fetchPlateTypes() {
  const response = await axios.get(API_URL + '/api/atlas/platetypes');
  return response.data;
}

export async function searchComponents(searchTerm) {
  const response = await axios.get(
    API_URL + '/api/atlas/components/_search/' + searchTerm
  );
  return response.data;
}

export async function fetchConcentrationUnits() {
  const response = await axios.get(API_URL + '/api/atlas/units/concentration');
  return response.data;
}

export async function fetchTimeUnits() {
  const response = await axios.get(API_URL + '/api/atlas/units/time');
  return response.data;
}
