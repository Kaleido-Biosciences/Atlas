import { createSlice } from 'redux-starter-kit';

const selectStep = createSlice({
  slice: 'selectStep',
  initialState: {
    experiment: null,
    plateSize: {
      rows: 8,
      columns: 12,
    },
  },
  reducers: {},
});

export const {
  actions: selectStepActions,
  reducer: selectStepReducer,
} = selectStep;

