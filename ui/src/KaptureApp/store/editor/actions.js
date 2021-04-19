import { editorActions } from 'AtlasUI/store';

const {
  toggleGridContainerSelections: _toggleGridContainerSelections,
  deselectGridContainers: _deselectGridContainers,
} = editorActions;

export const toggleGridContainerSelections = (gridId, positions) => {
  return (dispatch, getState) => {
    dispatch(_toggleGridContainerSelections({ gridId, positions }));
  };
};

export const deselectGridContainers = (gridIds) => {
  return (dispatch, getState) => {
    dispatch(_deselectGridContainers({ gridIds }));
  };
};
