import { createSlice } from 'redux-starter-kit';
import axios from 'axios';

const entityLists = createSlice({
  slice: 'entityLists',
  initialState: {
    pending: false,
    loaded: false,
    error: '',
    values: {
      communities: [],
      compounds: [],
      experiments: [],
      media: [],
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

    setValues(state, action) {
      const { communities, compounds, experiments, media } = action.payload;
      state.pending = false;
      state.loaded = true;
      state.error = '';
      state.values = { communities, compounds, experiments, media };
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
    try {
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
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
}
