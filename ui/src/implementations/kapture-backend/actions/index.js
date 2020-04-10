import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';
import * as printActions from './printActions';
import * as editorV2Actions from './editorV2Actions';
import * as editorToolsActions from './editorToolsActions';
import * as editorComponentsActions from './editorComponentsActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
  print: { ...printActions },
  editorV2: { ...editorV2Actions },
  editorTools: { ...editorToolsActions },
  editorComponents: { ...editorComponentsActions },
};
