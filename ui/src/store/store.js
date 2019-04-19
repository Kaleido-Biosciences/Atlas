import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import { entityListsReducer } from './entityLists';
import { createExperimentReducer } from './createExperiment';

const middleware = getDefaultMiddleware();
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    entityLists: entityListsReducer,
    createExperiment: createExperimentReducer,
    form: formReducer,
  },
  middleware,
});
