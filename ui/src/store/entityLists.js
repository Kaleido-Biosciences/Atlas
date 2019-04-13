import { createSlice, createSelector } from 'redux-starter-kit';
import axios from 'axios';

const entityLists = createSlice({
  slice: 'entityLists',
  initialState: {
    pending: false,
    error: false,
    loaded: false,
    communities: [],
    compounds: [],
    experiments: [],
    media: [],
  },
  reducers: {
    setPending(state, action) {
      state.pending = true;
      state.error = false;
      state.loaded = false;
    },

    setError(state, action) {
      state.pending = false;
      state.error = true;
      state.loaded = false;
    },

    setValues(state, action) {
      const { communities, compounds, experiments, media } = action.payload;
      state.pending = false;
      state.error = false;
      state.loaded = true;
      state.communities = communities;
      state.compounds = compounds;
      state.experiments = experiments;
      state.media = media;
    },
  },
});

export const {
  actions: entityListActions,
  reducer: entityListsReducer,
} = entityLists;

const { setPending, setError, setValues } = entityListActions;

export function fetchEntityLists() {
  return async (dispatch, getState) => {
    dispatch(setPending());
    const results = await Promise.all([
      axios.get('/api/communities'),
      axios.get('/api/compounds'),
      axios.get('/api/experiments'),
      axios.get('/api/media'),
    ]);
    const payload = {
      communities: results[0].data,
      compounds: results[1].data,
      experiments: results[2].data,
      media: results[3].data,
    };
    dispatch(setValues(payload));
  };
}
