import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';
import * as printActions from './printActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
  print: { ...printActions },
};
