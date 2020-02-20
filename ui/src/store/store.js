import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import './validators';
import { activitySearchReducer } from './activitySearch';
import { activityReducer } from './activity';
import { editorReducer } from './editor';
import { editorComponentsReducer } from './editorComponents';
import { editorToolsReducer } from './editorTools';
import { printReducer } from './print';
import { editorV2Reducer } from './editorV2';

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
    form: formReducer,
    editorV2: editorV2Reducer,
  },
  middleware,
});
