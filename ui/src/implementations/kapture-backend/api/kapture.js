import axios from 'axios';

import { API_URL } from '../config';

export function searchActivities(page, size, nameContains, descContains) {
  let queryString = '';
  if (page || size || nameContains || descContains) {
    const params = [];
    if (page) params.push(`page=${page}`);
    if (size) params.push(`size=${size}`);
    if (nameContains) params.push(`name.contains=${nameContains}`);
    if (descContains) params.push(`description.contains=${descContains}`);
    queryString += '?' + params.join('&');
  }
  return axios.get(API_URL + '/experiments' + queryString);
}

export async function fetchExperiment(id) {
  const response = await axios.get(`${API_URL}/experiments/${id}`);
  return response.data;
}

export function fetchCommunity(id) {
  return axios.get(API_URL + '/communities/' + id);
}

export function fetchCompound(id) {
  return axios.get(API_URL + '/batches/' + id);
}

export function fetchMedium(id) {
  return axios.get(API_URL + '/media/' + id);
}

export function fetchSupplement(id) {
  return axios.get(API_URL + '/supplements/' + id);
}
