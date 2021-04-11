import _ from 'lodash';

import { actions } from './slice';
import { selectApplyToolComponents } from './selectors';
import { api } from 'KaptureApp/api';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  createToolComponent,
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
} = actions;

export const { resetComponentSearch } = actions;

export const setActiveTool = (tool) => {
  return (dispatch, getState) => {
    dispatch(_setActiveTool({ tool }));
  };
};

export const setClickMode = (clickMode) => {
  return (dispatch, getState) => {
    dispatch(_setClickMode({ clickMode }));
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
      const toolComponents = selectApplyToolComponents(getState());
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

const updateToolComponentDescription = (toolComponent) => {
  const newComponent = { ...toolComponent };
  let description = '';
  if (
    toolComponent.isValid &&
    toolComponent.fields &&
    toolComponent.fields.timepoints &&
    toolComponent.fields.timepoints.length
  ) {
    const timepoints = toolComponent.fields.timepoints;
    const timepointStrings = timepoints.map((timepoint) => {
      if (timepoint.concentration) {
        return `${timepoint.concentration.toFixed(2)} @ 
              ${timepoint.time}h`;
      } else return '';
    });
    description = timepointStrings.join(', ');
  }
  newComponent.description = description;
  return newComponent;
};
