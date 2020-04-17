import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';

import './validators';
import {
  activitySearchReducer,
  activityReducer,
  printReducer,
  editorReducer,
} from 'AtlasUI/store';
import { editorComponentsReducer } from './editorComponents';
import { editorToolsReducer } from './editorTools';

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
    print: printReducer,
  },
  middleware,
});
