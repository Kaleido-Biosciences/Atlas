import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import './validators';
import { activitiesReducer } from './activities';
import { experimentReducer } from './experiment';
import { designExperimentReducer } from './designExperiment';

const middleware = getDefaultMiddleware();
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    experiment: experimentReducer,
    designExperiment: designExperimentReducer,
    form: formReducer,
  },
  middleware,
});
