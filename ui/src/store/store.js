import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import './validators';
import { activitySearchReducer } from './activitySearch';
import { activitiesReducer } from './activities';
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
    activities: activitiesReducer,
    editor: editorReducer,
    editorComponents: editorComponentsReducer,
    editorTools: editorToolsReducer,
    print: printReducer,
    form: formReducer,
  },
  middleware,
});
