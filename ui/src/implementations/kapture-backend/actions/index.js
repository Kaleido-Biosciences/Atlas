import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';
import * as printActions from './printActions';
import * as editorActions from './editorActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
  print: { ...printActions },
  editor: { ...editorActions },
};
