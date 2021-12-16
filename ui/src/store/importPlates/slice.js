import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingSourceActivity: false,
  loadingSourceActivityError: '',
  sourceActivity: null,
  mappings: [],
};

const importPlates = createSlice({
  name: 'importPlates',
  initialState,
  reducers: {
    setLoadingSourceActivity(state, action) {
      state.loadingSourceActivity = true;
      state.loadingSourceActivityError = '';
    },
    setLoadingSourceActivityError(state, action) {
      state.loadingSourceActivity = false;
      state.loadingSourceActivityError = action.payload.error;
    },
    setSourceActivity(state, action) {
      const { sourceActivity, targetPlates } = action.payload;
      let error = '';
      if (!sourceActivity.plates || sourceActivity.plates.length === 0) {
        error = 'The activity does not have any plates';
      } else {
        const plateWithType = sourceActivity.plates.find(
          (plate) => plate.plateType
        );
        if (!plateWithType)
          error =
            'The activity does not have at least one plate with a plate type';
      }
      state.loadingSourceActivityError = error;
      if (!error) {
        let sourcePlates = sourceActivity.plates.filter((plate) => {
          if (plate.plateType) {
            return true;
          } else return false;
        });
        state.sourceActivity = {
          name: sourceActivity.name,
          plates: sourcePlates,
        };
        state.mappings = targetPlates.map((plate, i) => {
          return {
            targetId: plate.id,
            sourceId: sourcePlates[i] ? sourcePlates[i].id : null,
          };
        });
      }
      state.loadingSourceActivity = false;
    },
    updateMappings(state, action) {
      const { mappings } = action.payload;
      mappings.forEach((mapping) => {
        const index = state.mappings.findIndex(
          (stateMapping) => stateMapping.targetId === mapping.targetId
        );
        state.mappings.splice(index, 1, mapping);
      });
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const { actions, reducer } = importPlates;
