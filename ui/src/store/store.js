import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';

import { entityListsReducer } from './entityLists';

export const store = configureStore({
  reducer: { entityLists: entityListsReducer },
  middleware: [...getDefaultMiddleware(), logger],
});
