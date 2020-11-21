import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {
  activitySearchReducer,
  activityReducer,
  printReducer,
  editorReducer,
} from 'AtlasUI/store';
import { editorComponentsReducer } from './editorComponents';
import { editorTools } from './editorTools';
import { editorImportReducer } from './editorImport';
import './validators';

const middleware = getDefaultMiddleware();
// Disable checks for performance
// const middleware = getDefaultMiddleware({
//   immutableCheck: false,
//   serializableCheck: false,
// });
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    activitySearch: activitySearchReducer,
    activity: activityReducer,
    editor: editorReducer,
    editorComponents: editorComponentsReducer,
    editorTools: editorTools.reducer,
    editorImport: editorImportReducer,
    print: printReducer,
  },
  middleware,
});
