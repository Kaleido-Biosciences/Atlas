import { actions } from './slice';
import * as selectors from './selectors';
import { api } from 'api';
import { createPlate } from 'models';

export function setPlateType(plateIds, plateType) {
  return async (dispatch, getState) => {
    dispatch(actions.setPlatesSaving({ plateIds, saving: true }));
    try {
      const responseData = await api.setPlateType(plateIds, plateType.id);
      const updatedPlates = responseData.map((data) => {
        return createPlate(data);
      });
      dispatch(actions.replacePlates({ plates: updatedPlates }));
    } catch (error) {
      dispatch(actions.setSetPlateTypeError({ error: error.message }));
    }
  };
}

export function setPlateIdToCopy(plateId) {
  return (dispatch, getState) => {
    dispatch(actions.setPlateIdToCopy({ plateId }));
  };
}

export function pasteToPlates(plateIds) {
  return async (dispatch, getState) => {
    const plates = selectors.selectPlates(getState());
    const plateToCopy = selectors.selectPlateToCopy(getState());
    const pasteTargets = plates.filter((plate) => plateIds.includes(plate.id));
    const plateIdsToUpdate = [];
    pasteTargets.forEach((pasteTarget) => {
      if (
        !pasteTarget.plateType ||
        pasteTarget.plateType.id !== plateToCopy.plateType.id
      ) {
        plateIdsToUpdate.push(pasteTarget.id);
      }
    });
    if (plateIdsToUpdate.length) {
      await dispatch(setPlateType(plateIdsToUpdate, plateToCopy.plateType));
    }
    dispatch(actions.pasteToPlates({ plateIds }));
  };
}

export function setPlateName(plateId, name) {
  return (dispatch, getState) => {
    dispatch(
      actions.setPlateName({
        plateId,
        name,
      })
    );
  };
}

export function updatePlateDetails(plateId, details) {
  return (dispatch, getState) => {
    dispatch(
      actions.updatePlateDetails({
        plateId,
        details,
      })
    );
  };
}

export function setPlateSelections(selections) {
  return (dispatch, getState) => {
    dispatch(actions.setPlateSelections({ selections }));
  };
}

export function updatePlateWells(plateId, updatedWells) {
  return (dispatch, getState) => {
    dispatch(
      actions.updatePlateWells({
        plateId,
        updatedWells,
      })
    );
  };
}

export function setGridComponents(gridId, actionPositions) {
  return (dispatch, getState) => {
    dispatch(
      actions.setGridComponents({
        gridId,
        positions: actionPositions,
      })
    );
  };
}

export function selectAllPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectAllPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function deselectAllPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.deselectAllPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function selectInteriorPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectInteriorPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function selectBorderPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectBorderPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function togglePlateWellSelections(wellIds, plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(actions.togglePlateWellSelections({ wellIds, plateIds, viewId }));
  };
}

export function removeComponentFromWell(plateId, wellId, componentId) {
  return (dispatch, getState) => {
    dispatch(
      actions.removeWellComponent({
        plateId,
        wellId,
        componentId,
      })
    );
  };
}

export function removeComponentTypesFromWells(
  componentTypes,
  wellIds,
  plateIds
) {
  return (dispatch, getState) => {
    dispatch(
      actions.removeComponentTypesFromWells({
        componentTypes,
        wellIds,
        plateIds,
      })
    );
  };
}
// (plateId, well, componentId) => {
//   return (dispatch, getState) => {
//     const grids = editor.selectGrids(getState());
//     const grid = grids.find((grid) => grid.id === gridId);
//     const flattened = grid.data.flat();
//     const gridPosition = flattened.find((gridPosition) => {
//       return (
//         gridPosition.row === position.row &&
//         gridPosition.column === position.column
//       );
//     });
//     if (gridPosition.container) {
//       const newComponents = gridPosition.container.components.filter(
//         (component) => {
//           return component.id !== componentId;
//         }
//       );
//       dispatch(
//         editor.setGridComponents(gridId, [
//           {
//             row: position.row,
//             column: position.column,
//             components: newComponents,
//           },
//         ])
//       );
//     }
//   };
// }
