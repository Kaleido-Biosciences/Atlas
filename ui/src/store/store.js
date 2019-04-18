import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import { entityListsReducer } from './entityLists';
import { createExperimentReducer } from './createExperiment';

export const store = configureStore({
  reducer: {
    entityLists: entityListsReducer,
    createExperiment: createExperimentReducer,
    form: formReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});
