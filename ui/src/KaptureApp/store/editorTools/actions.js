import { actions } from './slice';

const { setActiveTool: _setActiveTool } = actions;

export const {
  addComponentToToolComponents,
  setComponentTypesToClear,
  selectToolComponents,
  deselectToolComponents,
  removeToolComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
  setClickMode,
} = actions;

export const setActiveTool = (tool) => {
  return (dispatch, getState) => {
    dispatch(_setActiveTool({ tool }));
  };
};
