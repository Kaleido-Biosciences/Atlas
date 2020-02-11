import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
};
