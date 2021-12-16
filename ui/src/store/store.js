import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { activity } from './activity';
import { activitySearch } from './activitySearch';
import { importPlates } from './importPlates';
import { print } from './print';
import { tools } from './tools';

export const store = configureStore({
  reducer: {
    activity: activity.reducer,
    activitySearch: activitySearch.reducer,
    importPlates: importPlates.reducer,
    tools: tools.reducer,
    print: print.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === `development`) {
      return getDefaultMiddleware().concat(logger);
    } else return getDefaultMiddleware();
  },
  // middleware: (getDefaultMiddleware) => {
  //   if (process.env.NODE_ENV === `development`) {
  //     return getDefaultMiddleware({
  //       immutableCheck: false,
  //       serializableCheck: false,
  //     }).concat(logger);
  //   } else return getDefaultMiddleware();
  // },
});
