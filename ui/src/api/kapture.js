import axios from 'axios';

import { API_URL } from 'KaptureApp/config/api';

export function fetchCommunity(id) {
  return axios.get(API_URL + '/communities/' + id);
}

export function fetchCommunityByName(name) {
  return axios.get(API_URL + '/communities/?name.equals=' + name);
}

export function searchCommunities(searchTerm) {
  return axios.get(API_URL + '/_search/communities?size=5&query=' + searchTerm);
}

export function fetchCompound(id) {
  return axios.get(API_URL + '/batches/' + id);
}

export function fetchCompoundByName(name) {
  return axios.get(API_URL + '/batches/?name.equals=' + name);
}

export function searchCompounds(searchTerm) {
  return axios.get(API_URL + '/_search/batches?size=5&query=' + searchTerm);
}

export function fetchMedium(id) {
  return axios.get(API_URL + '/media/' + id);
}

export function fetchMediumByName(name) {
  return axios.get(API_URL + '/media/?name.equals=' + name);
}

export function searchMedia(searchTerm) {
  return axios.get(API_URL + '/_search/media?size=5&query=' + searchTerm);
}

export function fetchSupplement(id) {
  return axios.get(API_URL + '/supplements/' + id);
}

export function fetchSupplementByName(name) {
  return axios.get(API_URL + '/supplements/?name.equals=' + name);
}

export function searchSupplements(searchTerm) {
  return axios.get(API_URL + '/_search/supplements?size=5&query=' + searchTerm);
}
