import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {
  activitySearchReducer,
  activityReducer,
  printReducer,
  editorReducer,
} from 'AtlasUI/store';
import { editorComponentsReducer } from './editorComponents';
import { editorToolsReducer } from './editorTools';
import { editorImportReducer } from './editorImport';
import './validators';

const middleware = getDefaultMiddleware();
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    activitySearch: activitySearchReducer,
    activity: activityReducer,
    editor: editorReducer,
    editorComponents: editorComponentsReducer,
    editorTools: editorToolsReducer,
    editorImport: editorImportReducer,
    print: printReducer,
  },
  middleware,
});
