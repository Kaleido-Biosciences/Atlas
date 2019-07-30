import {
  createExperimentActions,
  addNewPlateMap as _addNewPlateMap,
} from './createExperiment';

const handleChange = experimentData => {
  console.log(experimentData);
};

function wrapActionWithSave(fn) {
  return function() {
    return (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      const experimentData = getState().createExperiment;
      handleChange(experimentData);
    };
  };
}

export const {
  setExperimentOptions,
  toggleWellsSelected,
  setClickMode,
  deselectAllWells,
} = createExperimentActions;

export const initializePlateMaps = wrapActionWithSave(() => {
  return (dispatch, getState) => {
    let { plateMaps } = getState().createExperiment;
    if (!plateMaps.length) {
      dispatch(_addNewPlateMap());
    }
  };
});

export const addNewPlateMap = wrapActionWithSave(_addNewPlateMap);

export const applySelectedComponentsToWells = wrapActionWithSave(
  createExperimentActions.applySelectedComponentsToWells
);

export const clearWells = wrapActionWithSave(
  createExperimentActions.clearWells
);
