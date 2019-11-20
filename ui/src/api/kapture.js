import axios from 'axios';

import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
} from '../constants';
import { API_URL } from '../config';
import { createComponent } from '../store/plateFunctions';

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

export async function fetchExperiment(id) {
  const response = await axios.get(`${API_URL}/experiments/${id}`);
  return response.data;
}

export function fetchExperiments(page, size, nameContains, descContains) {
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

export function fetchComponents(page, size, nameContains, descContains) {
  let queryString = '';
  if (page || size || nameContains || descContains) {
    const params = [];
    if (page) params.push(`page=${page}`);
    if (size) params.push(`size=${size}`);
    if (nameContains) params.push(`query=${nameContains}`);
    if (descContains) params.push(`description.contains=${descContains}`);
    queryString += '?' + params.join('&');
  }
  const communities = axios.get(API_URL + '/_search/communities' + queryString);
  const compounds = axios.get(API_URL + '/_search/batches' + queryString);
  const media = axios.get(API_URL + '/_search/media' + queryString);
  const supplements = axios.get(API_URL + '/_search/supplements' + queryString);
  return Promise.all([communities, compounds, media, supplements]).then(
    response => {
      return {
        communities: response[0].data,
        compounds: response[1].data,
        media: response[2].data,
        supplements: response[3].data,
      };
    }
  );
}

export async function searchComponents(page, size, query) {
  if (query) {
    const params = [];
    params.push(`query=${query}`);
    if (page) params.push(`page=${page}`);
    if (size) params.push(`size=${size}`);
    const queryString = '?' + params.join('&');
    const getUrl = url => `${API_URL}${url}${queryString}`;
    const communities = axios.get(getUrl('/_search/communities'));
    const compounds = axios.get(getUrl('/_search/batches'));
    const media = axios.get(getUrl('/_search/media'));
    const supplements = axios.get(getUrl('/_search/supplements'));
    const response = await Promise.all([
      communities,
      compounds,
      media,
      supplements,
    ]);
    const components = [];
    if (response[0].data.length) {
      response[0].data.forEach(component => {
        components.push(createComponent(component, COMPONENT_TYPE_COMMUNITY));
      });
    }
    if (response[1].data.length) {
      response[1].data.forEach(component => {
        components.push(createComponent(component, COMPONENT_TYPE_COMPOUND));
      });
    }
    if (response[2].data.length) {
      response[2].data.forEach(component => {
        components.push(createComponent(component, COMPONENT_TYPE_MEDIUM));
      });
    }
    if (response[3].data.length) {
      response[3].data.forEach(component => {
        components.push(createComponent(component, COMPONENT_TYPE_SUPPLEMENT));
      });
    }
    return components;
  }
}

export function findComponent(name) {
  const queryString = `?name.equals=${name}`;
  const communities = axios.get(API_URL + '/communities' + queryString);
  const compounds = axios.get(API_URL + '/batches' + queryString);
  const media = axios.get(API_URL + '/media' + queryString);
  const supplements = axios.get(API_URL + '/supplements' + queryString);
  return Promise.all([communities, compounds, media, supplements]).then(
    response => {
      const result = {
        name,
        found: false,
        type: null,
        data: null,
      };
      if (response[0].data.length) {
        result.found = true;
        result.type = COMPONENT_TYPE_COMMUNITY;
        result.data = response[0].data[0];
      } else if (response[1].data.length) {
        result.found = true;
        result.type = COMPONENT_TYPE_COMPOUND;
        result.data = response[1].data[0];
      } else if (response[2].data.length) {
        result.found = true;
        result.type = COMPONENT_TYPE_MEDIUM;
        result.data = response[2].data[0];
      } else if (response[3].data.length) {
        result.found = true;
        result.type = COMPONENT_TYPE_SUPPLEMENT;
        result.data = response[3].data[0];
      }
      return result;
    }
  );
}
