import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';
import * as printActions from './printActions';
import * as editorActions from './editorActions';
import * as editorToolsActions from 'KaptureApp/store';
import * as editorComponentsActions from './editorComponentsActions';
import * as editorImportActions from './editorImportActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
  print: { ...printActions },
  editor: { ...editorActions },
  editorTools: { ...editorToolsActions },
  editorComponents: { ...editorComponentsActions },
  editorImport: { ...editorImportActions },
};
