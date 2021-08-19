import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';
import * as selectors from './selectors';
import { api } from 'KaptureApp/api';
import {
  createGrid,
  createGridData,
  createContainersForGrid,
  addContainersToGrid,
} from 'AtlasUI/models';
import { STATUS_DRAFT } from 'KaptureApp/config/constants';

export const { resetState: resetActivity, resetSaveTime } = actions;

let lastSaveData = '';

const saveGrids = _.debounce(async (dispatch, getState) => {
  const exportedGrids = api.exportGrids(selectors.selectGrids(getState()));
  const stringifiedGrids = JSON.stringify(exportedGrids);
  if (stringifiedGrids !== lastSaveData) {
    dispatch(actions.setSavePending());
    const activityName = selectors.selectName(getState());
    const views = selectors.selectViews(getState());
    try {
      await api.updateActivityData(activityName, exportedGrids, views);
      dispatch(
        actions.setLastSaveTime({
          lastSaveTime: Date.now(),
        })
      );
      lastSaveData = stringifiedGrids;
    } catch (error) {
      dispatch(actions.setSaveError({ error: error.message }));
    }
  }
}, 500);

export const wrapWithChangeHandler = (fn) => {
  return function () {
    return async (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      saveGrids(dispatch, getState);
    };
  };
};

export const loadActivity = (id) => {
  return async (dispatch, getState) => {
    dispatch(actions.setLoading());
    try {
      const activity = await api.fetchActivity(id);
      let atlasData = await api.fetchActivityData(activity.name);
      if (!atlasData) {
        const time = Date.now();
        atlasData = {
          activityId: activity.name,
          status: STATUS_DRAFT,
          grids: [],
          views: [
            {
              id: uuidv4(),
              name: 'Overview',
              type: 'Overview',
              active: true,
              data: {},
            },
          ],
          createdTime: time,
          updatedTime: time,
        };
        await api.createActivityData(atlasData);
      }
      const importData = await importGrids(atlasData.grids);
      dispatch(
        actions.setActivity({
          activity: {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            grids: importData.grids,
            views: atlasData.views,
            status: atlasData.status,
            createdTime: atlasData.createdTime,
            updatedTime: atlasData.updatedTime,
          },
        })
      );
    } catch (error) {
      dispatch(actions.setInitializationError({ error: error.message }));
    }
  };
};

export const addNewPlates = wrapWithChangeHandler((dimensions, quantity) => {
  return (dispatch, getState) => {
    const grids = [];
    for (let i = 0; i < quantity; i++) {
      const gridData = createGridData(dimensions);
      const grid = createGrid({
        containerType: 'Plate',
        dimensions: dimensions,
        data: gridData,
      });
      const containerPositions = createContainersForGrid(
        dimensions,
        'PlateWell'
      );
      addContainersToGrid(grid, containerPositions);
      grids.push(grid);
    }
    dispatch(actions.addGrids({ grids, activeGridId: grids[0].id }));
  };
});

export const importGrids = async (grids) => {
  const kaptureComponents = await api.fetchComponentsForGrids(grids);
  return api.importGrids(grids, kaptureComponents);
};

export const addView = wrapWithChangeHandler((viewData) => {
  return (dispatch, getState) => {
    dispatch(
      actions.addView({
        view: {
          id: uuidv4(),
          name: 'Untitled1',
          type: viewData.type,
          active: false,
          data: viewData.data,
        },
      })
    );
  };
});

export const setActiveView = wrapWithChangeHandler((viewId) => {
  return (dispatch, getState) => {
    dispatch(actions.setActiveView({ viewId }));
  };
});
