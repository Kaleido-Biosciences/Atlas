import { createSelector } from 'redux-starter-kit';
import { getActivePlateMap, getSelectedWells } from './plateFunctions';

export const selectActivePlateMap = createSelector(
  ['createExperiment.plateMaps'],
  getActivePlateMap
);

export const selectSelectedWellsFromActivePlateMap = createSelector(
  ['createExperiment.plateMaps'],
  plateMaps => {
    const activePlateMap = getActivePlateMap(plateMaps);
    if (activePlateMap) {
      return getSelectedWells(activePlateMap);
    } else return null;
  }
);
