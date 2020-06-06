import { activityActions } from 'FetchApp/store';
import { api } from 'FetchApp/api';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
} = activityActions;

export const loadActivity = (id) => {
  return async (dispatch, getState) => {
    dispatch(_setInitialized({ initialized: false }));
    try {
      const response = await api.fetchActivity(id);
      const activity = response.data.body;
      dispatch(
        _setActivity({
          activity: {
            id: activity.name,
            name: activity.name,
            description: activity.description,
            data: activity,
          },
        })
      );
      dispatch(_setInitialized({ initialized: true }));
      // const versions = await api.fetchActivityVersions(activity.name);
      // if (!versions.length) {
      //   versions.push({
      //     plateMaps: [],
      //     experiment_status: `${activity.name}_DRAFT`,
      //     version: 0,
      //   });
      // }
      // const containerCollections = versions.map((version) => {
      //   return getCollectionFromVersion(version);
      // });
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};
