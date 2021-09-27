import _ from 'lodash';

import { actions } from './slice';
import * as selectors from './selectors';
import { editor } from '../editor';
import { activity } from '../activity';
import { api } from 'KaptureApp/api';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  createComponent,
  applyComponents,
} from 'KaptureApp/config/componentTypes';

const { wrapWithChangeHandler } = activity;

const {
  setActiveTool: _setActiveTool,
  setComponentSearchTerm: _setComponentSearchTerm,
  setComponentSearchPending: _setComponentSearchPending,
  setComponentSearchResults: _setComponentSearchResults,
  setComponentSearchError: _setComponentSearchError,
  addApplyToolComponent: _addApplyToolComponent,
  updateApplyToolComponentSelections: _updateApplyToolComponentSelections,
  removeApplyToolComponents: _removeApplyToolComponents,
  updateApplyToolComponent: _updateApplyToolComponent,
  setComponentTypesToRemove: _setComponentTypesToRemove,
} = actions;

export const { resetComponentSearch } = actions;

export const setActiveTool = (tool) => {
  return (dispatch, getState) => {
    dispatch(_setActiveTool({ tool }));
    // const clickMode = selectors.selectClickMode(getState());
    // if (tool === 'remove' && clickMode === 'apply') {
    //   dispatch(_setClickMode({ clickMode: 'remove' }));
    // } else if (tool === 'apply' && clickMode === 'remove') {
    //   dispatch(_setClickMode({ clickMode: 'apply' }));
    // }
  };
};

// export const setClickMode = (clickMode) => {
//   return (dispatch, getState) => {
//     dispatch(_setClickMode({ clickMode }));
//     if (clickMode === 'apply' || clickMode === 'remove') {
//       const activeId = editor.selectActiveGridId(getState());
//       if (activeId) {
//         dispatch(editor.deselectGridContainers([activeId]));
//       }
//     }
//   };
// };

export const addApplyToolComponent = (component) => {
  return (dispatch, getState) => {
    dispatch(_addApplyToolComponent({ component }));
  };
};

export const addAttributeToApplyToolComponents = (fields) => {
  return (dispatch, getState) => {
    const component = createComponent(fields, COMPONENT_TYPE_ATTRIBUTE);
    dispatch(_addApplyToolComponent({ component }));
  };
};

export const updateApplyToolComponent = (component) => {
  return (dispatch, getState) => {
    dispatch(_updateApplyToolComponent({ component }));
  };
};

export const updateApplyToolComponentSelections = (componentIds, selected) => {
  return (dispatch, getState) => {
    dispatch(_updateApplyToolComponentSelections({ componentIds, selected }));
  };
};

export const removeApplyToolComponents = (componentIds) => {
  return (dispatch, getState) => {
    dispatch(_removeApplyToolComponents({ componentIds }));
  };
};

export const handleContainerClick = (plateId, wells) => {
  return (dispatch, getState) => {
    const clickMode = selectors.selectClickMode(getState());
    if (clickMode === 'apply') {
      dispatch(applySelectedToolComponentsToWells(plateId, wells));
    } else if (clickMode === 'select') {
      dispatch(editor.toggleGridContainerSelections(plateId, wells));
    } else if (clickMode === 'remove') {
      dispatch(removeComponentsFromContainers(plateId, wells));
    }
  };
};

export const applySelectedToolComponentsToWells = (plateId, wells) => {
  return (dispatch, getState) => {
    if (selectors.selectApplyToolComponentsValid(getState())) {
      const toolComponents = selectors.selectSelectedApplyToolComponents(
        getState()
      );
      const updatedWells = [];
      wells.forEach((well) => {
        updatedWells.push({
          ...well,
          components: applyComponents(well.components, toolComponents),
        });
      });
      dispatch(activity.updatePlateWells(plateId, updatedWells));
    }
  };
};

export const applySelectedToolComponentsToSelectedWells = (viewId) => {
  return (dispatch, getState) => {
    if (selectors.selectApplyToolComponentsValid(getState())) {
      const toolComponents = selectors.selectSelectedApplyToolComponents(
        getState()
      );
      const views = activity.selectViews(getState());
      const view = views.find((view) => view.id === viewId);
      const plates = activity.selectPlates(getState());
      view.viewPlates.forEach((viewPlate) => {
        if (viewPlate.selectedWells.length > 0) {
          const plate = plates.find((plate) => plate.id === viewPlate.id);
          const updatedWells = [];
          plate.wells.forEach((well) => {
            if (viewPlate.selectedWells.includes(well.name)) {
              updatedWells.push({
                ...well,
                components: applyComponents(well.components, toolComponents),
              });
            }
          });
          dispatch(activity.updatePlateWells(plate.id, updatedWells));
        }
      });
    }
  };
};

export const setComponentTypesToRemove = (componentTypes) => {
  return (dispatch, getState) => {
    dispatch(_setComponentTypesToRemove({ componentTypes }));
  };
};

export const removeComponentsFromContainers = wrapWithChangeHandler(
  (gridId, positions) => {
    return (dispatch, getState) => {
      const componentTypesToRemove = selectors.selectComponentTypesToRemove(
        getState()
      );
      const actionPositions = removeComponentsFromPositions(
        positions,
        componentTypesToRemove
      );
      dispatch(editor.setGridComponents(gridId, actionPositions));
    };
  }
);

export const removeComponentsFromSelectedContainers = wrapWithChangeHandler(
  (gridId) => {
    return (dispatch, getState) => {
      const grids = editor.selectGrids(getState());
      const grid = grids.find((grid) => grid.id === gridId);
      const positions = [];
      const flattened = grid.data.flat();
      flattened.forEach((position) => {
        if (position.container && position.container.selected) {
          positions.push(position);
        }
      });
      const componentTypesToRemove = selectors.selectComponentTypesToRemove(
        getState()
      );
      const actionPositions = removeComponentsFromPositions(
        positions,
        componentTypesToRemove
      );
      dispatch(editor.setGridComponents(gridId, actionPositions));
    };
  }
);

const removeComponentsFromPositions = (positions, componentTypesToRemove) => {
  const actionPositions = [];
  positions.forEach((position) => {
    if (position.container) {
      const newComponents = position.container.components.filter(
        (component) => {
          return !componentTypesToRemove.includes(component.type);
        }
      );
      actionPositions.push({
        row: position.row,
        column: position.column,
        components: newComponents,
      });
    }
  });
  return actionPositions;
};

export const removeComponentFromPosition = wrapWithChangeHandler(
  (gridId, position, componentId) => {
    return (dispatch, getState) => {
      const grids = editor.selectGrids(getState());
      const grid = grids.find((grid) => grid.id === gridId);
      const flattened = grid.data.flat();
      const gridPosition = flattened.find((gridPosition) => {
        return (
          gridPosition.row === position.row &&
          gridPosition.column === position.column
        );
      });
      if (gridPosition.container) {
        const newComponents = gridPosition.container.components.filter(
          (component) => {
            return component.id !== componentId;
          }
        );
        dispatch(
          editor.setGridComponents(gridId, [
            {
              row: position.row,
              column: position.column,
              components: newComponents,
            },
          ])
        );
      }
    };
  }
);

export const toggleComponentDisplayEditForm = (component) => {
  return (dispatch, getState) => {
    if (component.editable) {
      dispatch(
        _updateApplyToolComponent({
          component: {
            ...component,
            displayEditForm: !component.displayEditForm,
          },
        })
      );
    }
  };
};

export const searchComponents = (searchTerm) => {
  return (dispatch, getState) => {
    dispatch(_setComponentSearchTerm({ searchTerm }));
    loadResults(searchTerm, dispatch, getState);
  };
};

const loadResults = _.debounce(async (searchTerm, dispatch, getState) => {
  if (searchTerm) {
    try {
      dispatch(_setComponentSearchPending());
      const results = await api.searchComponents(0, 4, searchTerm);
      const searchUpper = searchTerm.toUpperCase();
      results.sort((a, b) => {
        const aName = a.data.name.toUpperCase();
        const bName = b.data.name.toUpperCase();
        const aNameContainsTerm = aName.includes(searchUpper);
        const bNameContainsTerm = bName.includes(searchUpper);
        let value;
        if (aNameContainsTerm && bNameContainsTerm) {
          value = 0;
        } else if (aNameContainsTerm && !bNameContainsTerm) {
          value = -1;
        } else if (!aNameContainsTerm && bNameContainsTerm) {
          value = 1;
        }
        return value;
      });
      const toolComponents = selectors.selectApplyToolComponents(getState());
      const ids = toolComponents.map((toolComponent) => toolComponent.id);
      const filtered = results.filter((result) => {
        return !ids.includes(result.id);
      });
      dispatch(_setComponentSearchResults({ results: filtered }));
    } catch (error) {
      dispatch(_setComponentSearchError({ error: error.message }));
    }
  }
}, 500);
