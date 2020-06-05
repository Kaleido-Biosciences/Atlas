import axios from 'axios';

import { API_URL } from 'FetchApp/config/api';

export const searchActivities = async (searchTerm) => {
  return await axios.get(API_URL + `/activities/search/${searchTerm}`);
};

export const fetchActivity = async (id) => {
  return await axios.get(API_URL + `/activities/${id}`);
};
