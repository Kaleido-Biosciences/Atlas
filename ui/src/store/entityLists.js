import { createSlice } from 'redux-starter-kit';

const entityLists = createSlice({
  slice: 'entityLists',
  initialState: {
    experiments: {
      isLoading: false,
      success: false,
      error: false,
      values: null,
    },
  },
  reducers: {
    setLoading(state, action) {
      const { entityKey } = action.payload;
      state[entityKey].isLoading = true;
      state[entityKey].success = false;
      state[entityKey].error = false;
      state[entityKey].values = null;
    }
  }
});

export const { reducer: entityListsReducer } = entityLists;
