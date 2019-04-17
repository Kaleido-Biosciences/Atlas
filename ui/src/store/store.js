import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import { entityListsReducer } from './entityLists';

export const store = configureStore({
  reducer: {
    entityLists: entityListsReducer,
    form: formReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});
