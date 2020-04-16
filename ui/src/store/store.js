import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';

import './validators';
import { activitySearchReducer } from 'AtlasUI/store';
import { activityReducer } from './activity';
import { editorReducer } from './editor';
import { editorComponentsReducer } from './editorComponents';
import { editorToolsReducer } from './editorTools';
import { printReducer } from './print';

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
