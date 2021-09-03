import { reducer } from './slice';
import * as actions from './actions';
import * as selectors from './selectors';

export const grids = {
  reducer,
  ...actions,
  ...selectors,
};
