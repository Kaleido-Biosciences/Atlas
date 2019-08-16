import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import './validators';
import { selectStepReducer } from './selectStep';
import { createExperimentReducer } from './createExperiment';

const middleware = getDefaultMiddleware();
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    selectStep: selectStepReducer,
    createExperiment: createExperimentReducer,
    form: formReducer,
  },
  middleware,
});
