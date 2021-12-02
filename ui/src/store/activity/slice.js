import { createSlice } from '@reduxjs/toolkit';
import { copyWells, setPlateProperties, swapComponents } from 'models';

const initialState = {
  loading: false,
  initialized: false,
  initializationError: '',
  id: null,
  name: '',
  description: '',
  startDate: null,
  updateDate: null,
  plates: [],
  views: [],
  plateTypes: [],
  plateIdToCopy: null,
  setPlateTypeError: '',
  deleteActivityStatus: '',
};

const activity = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = true;
      state.initialized = false;
      state.initializationError = '';
    },
    setInitializationError(state, action) {
      state.loading = false;
      state.initialized = false;
      state.initializationError = action.payload.error;
    },
    setActivity(state, action) {
      const { activity } = action.payload;
      Object.assign(state, activity);
      state.loading = false;
      state.initialized = true;
      state.initializationError = '';
      const positioned = state.plates.find((plate) => {
        return (
          plate.overviewPositionLeft !== null &&
          plate.overviewPositionLeft !== undefined &&
          plate.overviewPositionTop !== null &&
          plate.overviewPositionTop !== undefined
        );
      });
      if (!positioned) {
        arrangePlates(state.plates);
      }
    },
    autoArrangePlates(state, action) {
      arrangePlates(state.plates);
    },
    setPlateTypes(state, action) {
      state.plateTypes = action.payload.plateTypes;
    },
    updatePlateType(state, action) {
      const { data } = action.payload;
      const existingPlate = state.plates.find((plate) => plate.id === data.id);
      existingPlate.plateType = data.plateType;
      existingPlate.wells = data.wells;
      setPlateProperties(existingPlate);
    },
    setPlatesSaving(state, action) {
      const { plateIds, saving } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        plate.saving = saving;
      });
    },
    swapComponents(state, action) {
      const { plateIds } = action.payload;
      const plates = state.plates.filter((plate) =>
        plateIds.includes(plate.id)
      );
      swapComponents(plates);
    },
    setSetPlateTypeError(state, action) {
      state.setPlateTypeError = action.payload.error;
    },
    clearSetPlateTypeError(state, action) {
      state.setPlateTypeError = '';
      state.plates.forEach((plate) => {
        plate.saving = false;
      });
    },
    updatePlateWells(state, action) {
      const { plateId, updatedWells } = action.payload;
      const plate = findPlate(plateId, state.plates);
      updatedWells.forEach((updatedWell) => {
        const plateWell = findWell(updatedWell.id, plate.wells);
        plateWell.components = updatedWell.components;
      });
    },
    setPlateName(state, action) {
      const { plateId, name } = action.payload;
      const plate = findPlate(plateId, state.plates);
      plate.name = name;
    },
    updatePlateDetails(state, action) {
      const { plateId, details } = action.payload;
      const plate = findPlate(plateId, state.plates);
      Object.assign(plate, details);
    },
    updatePlateProperties(state, action) {
      const { plateProperties } = action.payload;
      plateProperties.forEach((plateProps) => {
        const statePlate = state.plates.find(
          (statePlate) => statePlate.id === plateProps.id
        );
        Object.assign(statePlate, plateProps);
      });
    },
    setPlateIdToCopy(state, action) {
      state.plateIdToCopy = action.payload.plateId;
    },
    pasteToPlates(state, action) {
      if (state.plateIdToCopy) {
        const sourcePlate = findPlate(state.plateIdToCopy, state.plates);
        if (sourcePlate && sourcePlate.plateType) {
          const targetPlateIds = action.payload.plateIds;
          targetPlateIds.forEach((targetPlateId) => {
            const targetPlate = findPlate(targetPlateId, state.plates);
            copyWells(targetPlate, sourcePlate);
          });
        }
      }
    },
    setPlateSelections(state, action) {
      const { selections } = action.payload;
      state.plates.forEach((plate) => {
        plate.selected = selections.includes(plate.id);
      });
    },
    setActiveView(state, action) {
      const { viewId, plateId } = action.payload;
      let activeView;
      state.views.forEach((view) => {
        if (view.id === viewId) {
          view.active = true;
          activeView = view;
        } else view.active = false;
      });
      if (plateId) {
        state.plates.forEach((plate) => {
          if (plate.id === plateId) {
            plate.selected = true;
          } else plate.selected = false;
        });
      } else {
        if (activeView.id === 'PlateTable' || activeView.id === 'PlateEditor') {
          let selectedFound = false;
          state.plates.forEach((plate, i) => {
            if (plate.selected && !selectedFound) {
              selectedFound = true;
            } else {
              plate.selected = false;
            }
            if (plate.wells) {
              plate.wells.forEach((well) => {
                well.selected = false;
              });
            }
          });
          if (!selectedFound) state.plates[0].selected = true;
        } else {
          state.plates.forEach((plate, i) => {
            plate.selected = false;
            if (plate.wells) {
              plate.wells.forEach((well) => {
                well.selected = false;
              });
            }
          });
        }
      }
    },
    updateViewData(state, action) {
      const { viewId, data } = action.payload;
      const view = state.views.find((view) => view.id === viewId);
      Object.assign(view.data, data);
    },
    selectAllPlateWells(state, action) {
      const { plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        if (plate.wells) {
          plate.wells.forEach((well) => {
            well.selected = true;
          });
        }
      });
    },
    deselectAllPlateWells(state, action) {
      const { plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        if (plate.wells) {
          plate.wells.forEach((well) => {
            well.selected = false;
          });
        }
      });
    },
    selectInteriorPlateWells(state, action) {
      const { plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        if (plate.wells) {
          for (let i = 0; i < plate.plateType.numRows; i++) {
            const start = i * plate.plateType.numCols;
            const end = (i + 1) * plate.plateType.numCols;
            const row = plate.wells.slice(start, end);
            row.forEach((well, j) => {
              if (i === 0 || i === plate.plateType.numRows - 1) {
                well.selected = false;
              } else {
                if (j === 0 || j === plate.plateType.numCols - 1) {
                  well.selected = false;
                } else well.selected = true;
              }
            });
          }
        }
      });
    },
    selectBorderPlateWells(state, action) {
      const { plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        if (plate.wells) {
          for (let i = 0; i < plate.plateType.numRows; i++) {
            const start = i * plate.plateType.numCols;
            const end = (i + 1) * plate.plateType.numCols;
            const row = plate.wells.slice(start, end);
            row.forEach((well, j) => {
              if (i === 0 || i === plate.plateType.numRows - 1) {
                well.selected = true;
              } else {
                if (j === 0 || j === plate.plateType.numCols - 1) {
                  well.selected = true;
                } else well.selected = false;
              }
            });
          }
        }
      });
    },
    togglePlateWellSelections(state, action) {
      const { wellIds, plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        const status = { selected: false, deselected: false };
        const wellsToUpdate = [];
        wellIds.forEach((wellId) => {
          const well = findWell(wellId, plate.wells);
          if (well.selected) {
            status.selected = true;
          } else {
            status.deselected = true;
          }
          wellsToUpdate.push(well);
        });
        const newSelectionStatus =
          (status.selected && status.deselected) || !status.selected
            ? true
            : false;
        wellsToUpdate.forEach((well) => {
          well.selected = newSelectionStatus;
        });
      });
    },
    removeWellComponent(state, action) {
      const { plateId, wellId, componentId } = action.payload;
      const plate = findPlate(plateId, state.plates);
      const well = findWell(wellId, plate.wells);
      const wellIndex = well.components.findIndex(
        (component) => component.id === componentId
      );
      well.components.splice(wellIndex, 1);
    },
    removeComponentTypesFromWells(state, action) {
      const { componentTypes, wellIds, plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        wellIds.forEach((wellId) => {
          const well = findWell(wellId, plate.wells);
          well.components = well.components.filter(
            (component) => !componentTypes.includes(component.type)
          );
        });
      });
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
    setDeleteActivityStatus(state, action) {
      state.deleteActivityStatus = action.payload.status;
    },
  },
});

export const { actions, reducer } = activity;

function findPlate(plateId, plates) {
  return plates.find((plate) => plate.id === plateId);
}

function findWell(wellId, wells) {
  return wells.find((well) => well.id === wellId);
}

function arrangePlates(plates) {
  let currentLeft = 10,
    spacing = 10,
    top = 10;
  plates.forEach((plate) => {
    plate.overviewPositionLeft = currentLeft;
    plate.overviewPositionTop = top;
    currentLeft += plate.overviewWidth + spacing;
  });
}
