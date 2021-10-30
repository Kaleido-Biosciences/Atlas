import axios from 'axios';

import { API_URL } from 'KaptureApp/config/api';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from 'KaptureApp/config/componentTypes';

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

export function findComponent(name) {
  const queryString = `?name.equals=${name}`;
  const communities = axios.get(API_URL + '/communities' + queryString);
  const compounds = axios.get(API_URL + '/batches' + queryString);
  const media = axios.get(API_URL + '/media' + queryString);
  const supplements = axios.get(API_URL + '/supplements' + queryString);
  return Promise.all([communities, compounds, media, supplements]).then(
    (response) => {
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

export async function fetchComponentsForGrids(grids) {
  const components = {
    [COMPONENT_TYPE_COMMUNITY]: [],
    [COMPONENT_TYPE_COMPOUND]: [],
    [COMPONENT_TYPE_MEDIUM]: [],
    [COMPONENT_TYPE_SUPPLEMENT]: [],
    [COMPONENT_TYPE_ATTRIBUTE]: [],
  };
  const response = {
    [COMPONENT_TYPE_COMMUNITY]: [],
    [COMPONENT_TYPE_COMPOUND]: [],
    [COMPONENT_TYPE_MEDIUM]: [],
    [COMPONENT_TYPE_SUPPLEMENT]: [],
    [COMPONENT_TYPE_ATTRIBUTE]: [],
  };
  grids.forEach((grid) => {
    grid.data.forEach((position) => {
      position.components.forEach((component) => {
        const cType = component.type;
        if (!components[cType].includes(component.id)) {
          components[cType].push(component.id);
        }
      });
    });
  });
  let promises, results;
  promises = components[COMPONENT_TYPE_COMMUNITY].map((id) => {
    return fetchCommunity(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_COMMUNITY].push(result.data);
  });
  promises = components[COMPONENT_TYPE_COMPOUND].map((id) => {
    return fetchCompound(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_COMPOUND].push(result.data);
  });
  promises = components[COMPONENT_TYPE_MEDIUM].map((id) => {
    return fetchMedium(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_MEDIUM].push(result.data);
  });
  promises = components[COMPONENT_TYPE_SUPPLEMENT].map((id) => {
    return fetchSupplement(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_SUPPLEMENT].push(result.data);
  });
  return response;
}
