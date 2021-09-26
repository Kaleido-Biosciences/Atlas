import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';
import * as selectors from './selectors';
import * as gridActions from './gridActions';
import * as viewActions from './viewActions';
import { api } from 'KaptureApp/api';
import { STATUS_DRAFT } from 'KaptureApp/config/constants';

export const { resetState: resetActivity, resetSaveTime } = actions;

export function loadActivity(id) {
  return async (dispatch, getState) => {
    dispatch(actions.setLoading());
    // try {
    const activity = await api.fetchActivity(id);
    activity.views = [viewActions.getOverview(activity.plates, true)];
    dispatch(actions.setActivity({ activity }));
    // } catch (error) {
    //   dispatch(actions.setInitializationError({ error: error.message }));
    // }
  };
}

export const togglePlateSelection = gridActions.togglePlateSelection;
export const setPlateSize = gridActions.setPlateSize;
export const setPlateName = gridActions.setPlateName;

export const setAllViewPlatesSelected = viewActions.setAllViewPlatesSelected;

export const setGridComponents = gridActions.setGridComponents;
export const selectAllGridContainers = gridActions.selectAllGridContainers;
export const deselectAllGridContainers = gridActions.deselectAllGridContainers;
export const selectInteriorGridContainers =
  gridActions.selectInteriorGridContainers;
export const selectBorderGridContainers =
  gridActions.selectBorderGridContainers;

export const addView = viewActions.addView;
export const setActiveView = viewActions.setActiveView;

async function importGrids(grids) {
  const kaptureComponents = await api.fetchComponentsForGrids(grids);
  return api.importGrids(grids, kaptureComponents);
}

function getStringifiedData(grids, views) {
  return JSON.stringify(grids) + JSON.stringify(views);
}

let lastSaveData = '';

// const saveActivity = _.debounce(async (dispatch, getState) => {
//   const exportedGrids = api.exportGrids(selectors.selectGrids(getState()));
//   const views = selectors.selectViews(getState());
//   const stringifiedData = getStringifiedData(exportedGrids, views);
//   if (stringifiedData !== lastSaveData) {
//     dispatch(actions.setSavePending());
//     const activityName = selectors.selectName(getState());
//     try {
//       await api.updateActivityData(activityName, exportedGrids, views);
//       dispatch(
//         actions.setLastSaveTime({
//           lastSaveTime: Date.now(),
//         })
//       );
//       lastSaveData = stringifiedData;
//     } catch (error) {
//       dispatch(actions.setSaveError({ error: error.message }));
//     }
//   }
// }, 1000);

export function wrapWithChangeHandler(fn) {
  // return function () {
  //   return async (dispatch, getState) => {
  //     dispatch(fn.apply(this, arguments));
  //     saveActivity(dispatch, getState);
  //   };
  // };
}

// export function loadActivity(id) {
//   return async (dispatch, getState) => {
//     dispatch(actions.setLoading());
//     try {
//       const activity = await api.fetchActivity(id);
//       let atlasData = await api.fetchActivityData(activity.name);
//       if (!atlasData) {
//         const time = Date.now();
//         atlasData = {
//           activityId: activity.name,
//           status: STATUS_DRAFT,
//           grids: [],
//           views: [
//             {
//               id: uuidv4(),
//               name: 'Overview',
//               type: 'Overview',
//               active: true,
//               data: { selectedGrids: [] },
//             },
//           ],
//           createdTime: time,
//           updatedTime: time,
//         };
//         await api.createActivityData(atlasData);
//       }
//       const importData = await importGrids(atlasData.grids);
//       dispatch(
//         actions.setActivity({
//           activity: {
//             id: activity.id,
//             name: activity.name,
//             description: activity.description,
//             grids: importData.grids,
//             views: atlasData.views,
//             status: atlasData.status,
//             createdTime: atlasData.createdTime,
//             updatedTime: atlasData.updatedTime,
//           },
//         })
//       );
//       const exportedGrids = api.exportGrids(selectors.selectGrids(getState()));
//       const views = selectors.selectViews(getState());
//       lastSaveData = getStringifiedData(exportedGrids, views);
//     } catch (error) {
//       dispatch(actions.setInitializationError({ error: error.message }));
//     }
//   };
// }
