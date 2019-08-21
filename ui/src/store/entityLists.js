import { createSlice } from 'redux-starter-kit';
import axios from 'axios';

import { API_URL } from '../config';

const entityLists = createSlice({
  slice: 'entityLists',
  initialState: {
    pending: false,
    loaded: false,
    error: '',
    lists: {
      communities: [],
      compounds: [],
      experiments: [],
      media: [],
      supplements: [],
    },
    selectOptions: {
      communities: [],
      compounds: [],
      experiments: [],
      media: [],
      supplements: [],
    },
    selections: {
      communities: [],
      compounds: [],
      experiment: null,
      media: [],
      plateSize: 96,
      supplements: [],
    },
  },
  reducers: {
    setPending(state, action) {
      state.pending = true;
      state.loaded = false;
      state.error = '';
    },

    setError(state, action) {
      state.pending = false;
      state.loaded = false;
      state.error = action.payload;
    },

    setLists(state, action) {
      const {
        communities,
        compounds,
        experiments,
        media,
        supplements,
      } = action.payload;
      state.pending = false;
      state.loaded = true;
      state.error = '';
      state.lists = {
        communities,
        compounds,
        experiments,
        media,
        supplements,
      };
      state.selectOptions.experiments = experiments.map(mapExperimentToOption);
      state.selectOptions.communities = communities.map(mapCommunityToOption);
      state.selectOptions.compounds = compounds.map(mapCompoundToOption);
      state.selectOptions.media = media.map(mapMediumToOption);
      state.selectOptions.supplements = supplements.map(mapSupplementToOption);
    },

    setSelections(state, action) {
      state.selections = { ...action.payload };
    },
  },
});

export const {
  actions: entityListActions,
  reducer: entityListsReducer,
} = entityLists;

const { setPending, setError, setLists } = entityListActions;

export function fetchEntityLists() {
  return async (dispatch, getState) => {
    dispatch(setPending());
    try {
      const results = await Promise.all([
        axios.get(API_URL + '/communities'),
        axios.get(API_URL + '/batches'),
        axios.get(API_URL + '/experiments'),
        axios.get(API_URL + '/media'),
        axios.get(API_URL + '/supplements'),
      ]);
      const payload = {
        communities: results[0].data,
        compounds: results[1].data,
        experiments: results[2].data,
        media: results[3].data,
        supplements: results[4].data,
      };
      dispatch(setLists(payload));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
}

function mapExperimentToOption(exp, i) {
  const { id, name } = exp;
  const scientist = exp.scientist
    ? ` - ${exp.scientist.lastName}, ${exp.scientist.firstName}`
    : '';
  const description = exp.description ? ` - ${exp.description}` : '';
  return { key: i, text: name + scientist + description, value: id };
}

function mapCommunityToOption(comm, i) {
  return { key: i, text: comm.name, value: comm.id };
}

function mapCompoundToOption(comp, i) {
  const { id, name } = comp;
  const notes = comp.notes ? ` - ${comp.notes}` : '';
  return { key: i, text: name + notes, value: id };
}

function mapMediumToOption(medium, i) {
  const { id, name } = medium;
  const description = medium.description ? ` - ${medium.description}` : '';
  return { key: i, text: name + description, value: id };
}

function mapSupplementToOption(supplement, i) {
  const { id, name } = supplement;
  const definition = name.definition ? ` - ${name.definition}` : '';
  return { key: i, text: name + definition, value: id };
}
