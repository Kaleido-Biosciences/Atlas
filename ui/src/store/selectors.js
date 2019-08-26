import { createSelector } from 'redux-starter-kit';
import { getActivePlate, getSelectedWells } from './plateFunctions';

export const selectActivePlate = createSelector(
  ['designExperiment.plates'],
  getActivePlate
);

export const selectSelectedWellsFromActivePlate = createSelector(
  ['designExperiment.plates'],
  plates => {
    const activePlate = getActivePlate(plates);
    if (activePlate) {
      return getSelectedWells(activePlate);
    } else return null;
  }
);
