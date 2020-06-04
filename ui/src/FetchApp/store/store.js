import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';

const middleware = getDefaultMiddleware();
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {},
  middleware,
});
