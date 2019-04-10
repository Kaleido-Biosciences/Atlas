import { configureStore } from 'redux-starter-kit';

import { entityListsReducer } from './entityLists';

export const store = configureStore({
  reducer: { entityLists: entityListsReducer },
});
