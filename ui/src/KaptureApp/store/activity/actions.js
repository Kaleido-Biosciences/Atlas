import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';
import * as selectors from './selectors';
import { api } from 'KaptureApp/api';
import { STATUS_DRAFT } from 'KaptureApp/config/constants';
import { actions as gridActions } from '../grids/slice';
import * as gridSelectors from '../grids/selectors';

export const { resetState: resetActivity, resetSaveTime } = actions;

let lastSaveData = '';

const saveGrids = _.debounce(async (dispatch, getState) => {
  const exportedGrids = api.exportGrids(gridSelectors.selectGrids(getState()));
  const views = selectors.selectViews(getState());
  const stringifiedData = JSON.stringify(exportedGrids) + JSON.stringify(views);
  if (stringifiedData !== lastSaveData) {
    dispatch(actions.setSavePending());
    const activityName = selectors.selectName(getState());
    try {
      await api.updateActivityData(activityName, exportedGrids, views);
      dispatch(
        actions.setLastSaveTime({
          lastSaveTime: Date.now(),
        })
      );
      lastSaveData = stringifiedData;
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
            views: atlasData.views,
            status: atlasData.status,
            createdTime: atlasData.createdTime,
            updatedTime: atlasData.updatedTime,
          },
        })
      );
      dispatch(gridActions.setGrids({ grids: importData.grids }));
      const exportedGrids = api.exportGrids(
        gridSelectors.selectGrids(getState())
      );
      const views = selectors.selectViews(getState());
      const stringifiedData =
        JSON.stringify(exportedGrids) + JSON.stringify(views);
      lastSaveData = stringifiedData;
    } catch (error) {
      dispatch(actions.setInitializationError({ error: error.message }));
    }
  };
};

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
