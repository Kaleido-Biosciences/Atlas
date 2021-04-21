import _ from 'lodash';

import { actions } from './slice';
import * as selectors from './selectors';
import { editor } from '../editor';
import { api } from 'KaptureApp/api';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  createToolComponent,
  sortComponentsByType,
  getComponentFromToolComponent,
  updateToolComponentDescription,
  updateComponentDescription,
} from 'KaptureApp/config/componentTypes';

const {
  setActiveTool: _setActiveTool,
  setClickMode: _setClickMode,
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
    const clickMode = selectors.selectClickMode(getState());
    if (tool === 'remove' && clickMode === 'apply') {
      dispatch(_setClickMode({ clickMode: 'remove' }));
    } else if (tool === 'apply' && clickMode === 'remove') {
      dispatch(_setClickMode({ clickMode: 'apply' }));
    }
  };
};

export const setClickMode = (clickMode) => {
  return (dispatch, getState) => {
    dispatch(_setClickMode({ clickMode }));
    if (clickMode === 'apply' || clickMode === 'remove') {
      const activeId = editor.selectActiveGridId(getState());
      if (activeId) {
        dispatch(editor.deselectGridContainers([activeId]));
      }
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

export const addApplyToolComponent = (component) => {
  return (dispatch, getState) => {
    dispatch(
      _addApplyToolComponent({
        component: updateToolComponentDescription(component),
      })
    );
  };
};

export const addAttributeToApplyToolComponents = (fields) => {
  return (dispatch, getState) => {
    const component = createToolComponent(fields, COMPONENT_TYPE_ATTRIBUTE);
    dispatch(_addApplyToolComponent({ component }));
  };
};

export const updateApplyToolComponent = (component) => {
  return (dispatch, getState) => {
    dispatch(
      _updateApplyToolComponent({
        component: updateToolComponentDescription(component),
      })
    );
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

export const handleContainerClick = (gridId, positions) => {
  return (dispatch, getState) => {
    const clickMode = selectors.selectClickMode(getState());
    if (clickMode === 'apply') {
      dispatch(applySelectedToolComponentsToContainers(gridId, positions));
    } else if (clickMode === 'select') {
      dispatch(editor.toggleGridContainerSelections(gridId, positions));
    }
  };
};

export const applySelectedToolComponentsToContainers = (gridId, positions) => {
  return (dispatch, getState) => {
    if (selectors.selectApplyToolComponentsValid(getState())) {
      const toolComponents = selectors.selectSelectedApplyToolComponents(
        getState()
      );
      const actionPositions = applyToolComponentsToPositions(
        positions,
        toolComponents
      );
      dispatch(editor.setGridComponents(gridId, actionPositions));
    }
  };
};

export const applySelectedToolComponentsToSelectedContainers = (gridId) => {
  return (dispatch, getState) => {
    if (selectors.selectApplyToolComponentsValid(getState())) {
      const toolComponents = selectors.selectSelectedApplyToolComponents(
        getState()
      );
      const grids = editor.selectGrids(getState());
      const grid = grids.find((grid) => grid.id === gridId);
      const positions = [];
      const flattened = grid.data.flat();
      flattened.forEach((position) => {
        if (position.container && position.container.selected) {
          positions.push(position);
        }
      });
      const actionPositions = applyToolComponentsToPositions(
        positions,
        toolComponents
      );
      dispatch(editor.setGridComponents(gridId, actionPositions));
    }
  };
};

const applyToolComponentsToPositions = (positions, toolComponents) => {
  const actionPositions = [];
  positions.forEach((position) => {
    if (position.container) {
      const newComponents = updateContainerComponents(
        position.container,
        toolComponents
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

const updateContainerComponents = (container, toolComponentsToApply) => {
  const containerComponents = container.components.slice();
  const componentsToApply = toolComponentsToApply.map((toolComponent) => {
    return getComponentFromToolComponent(toolComponent);
  });
  componentsToApply.forEach((component) => {
    const existingComponent = containerComponents.find(
      (comp) => comp.id === component.id
    );
    if (!existingComponent) {
      containerComponents.push(updateComponentDescription(component));
    } else {
      if (existingComponent.options.timepoints) {
        existingComponent.options.timepoints.forEach((eTimepoint) => {
          const index = component.options.timepoints.findIndex(
            (timepoint) => timepoint.time === eTimepoint.time
          );
          if (index === -1) {
            component.options.timepoints.push(eTimepoint);
          }
        });
        component.options.timepoints.sort((a, b) => {
          return a.time - b.time;
        });
      }
      const index = containerComponents.findIndex(
        (eComponent) => eComponent.id === component.id
      );
      containerComponents.splice(
        index,
        1,
        updateComponentDescription(component)
      );
    }
  });
  return sortComponentsByType(containerComponents);
};

export const setComponentTypesToRemove = (componentTypes) => {
  return (dispatch, getState) => {
    dispatch(_setComponentTypesToRemove({ componentTypes }));
  };
};
