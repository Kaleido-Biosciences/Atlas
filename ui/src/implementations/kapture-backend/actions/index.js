import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';
import * as printActions from './printActions';
import * as editorActions from './editorActions';
import * as editorV2Actions from './editorV2Actions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
  print: { ...printActions },
  editor: { ...editorActions },
  editorV2: { ...editorV2Actions },
};
