import { editorV2Actions } from '../store';
import {
  getContainerCollection,
  importContainerCollection,
} from './activityActions';
import { createContainer, createContainerGrid } from '../models';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setContainerCollection: _setContainerCollection,
  addContainer: _addContainer,
  addContainerToContainerGrid: _addContainerToContainerGrid,
} = editorV2Actions;

export const { setActiveContainerId } = editorV2Actions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      dispatch(_setContainerCollection({ collection }));
      // const containers = await dispatch(
      //   importContainerCollection(status, version)
      // );
      // if (containers.length) {
      //   // TODO need a set containers action
      //   // dispatch(_setPlates({ plates }));
      // }
      dispatch(_setInitialized({ initialized: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const addNewContainerGrid = ({ containerGrid: c }) => {
  return (dispatch, getState) => {
    const containerGrid = createContainerGrid(null, c.type, null, c.dimensions);
    dispatch(_addContainer({ container: containerGrid }));
  };
};

export const addNewContainer = ({ container: c }) => {
  return (dispatch, getState) => {
    const container = createContainer(null, c.type);
    dispatch(_addContainer({ container: container }));
  };
};

export const addNewContainerToContainerGrid = (
  containerGridId,
  position,
  type
) => {
  return (dispatch, getState) => {
    const container = createContainer(null, type);
    dispatch(
      _addContainerToContainerGrid({
        containerGridId,
        position,
        container,
      })
    );
  };
};

export const handleContainerGridClick = positions => {
  return (dispatch, getState) => {
    console.log(positions);
  };
};
