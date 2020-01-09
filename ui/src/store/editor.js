import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  plates: [],
  plateSize: { rows: 8, columns: 12 },
  nextPlateId: 1,
};

const editor = createSlice({
  slice: 'editor',
  initialState,
  reducers: {
    setInitialized(state, action) {
      state.initialized = action.payload.initialized;
    },
    setPlates(state, action) {
      const { plates } = action.payload;
      state.plates = plates;
      state.plateSize = {
        rows: plates[0].wells.length,
        columns: plates[0].wells[0].length,
      };
    },
    addPlate(state, action) {
      const { plate } = action.payload;
      state.plates.forEach(plate => {
        plate.active = false;
      });
      plate.active = true;
      plate.id = state.nextPlateId;
      state.plates.push(plate);
      state.nextPlateId++;
    },
    resetNextPlateId(state, action) {
      state.nextPlateId = 1;
    },
    updateNextPlateId(state, action) {
      state.nextPlateId = action.payload.plateId;
    },
  },
});

export const { actions: editorActions, reducer: editorReducer } = editor;
