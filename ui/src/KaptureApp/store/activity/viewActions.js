import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function addView(viewData) {
  return (dispatch, getState) => {
    dispatch(
      actions.addView({
        view: {
          id: uuidv4(),
          type: viewData.type,
          data: viewData.data,
          active: false,
        },
      })
    );
  };
}

export function setActiveView(viewId) {
  return (dispatch, getState) => {
    dispatch(actions.setActiveView({ viewId }));
  };
}
