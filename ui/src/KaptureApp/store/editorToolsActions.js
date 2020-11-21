import { editorTools } from './editorTools';

const { setActiveTool: _setActiveTool } = editorTools.actions;

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
} = editorTools.actions;

export const setActiveTool = (tool) => {
  return (dispatch, getState) => {
    dispatch(_setActiveTool({ tool }));
  };
};
