import { actions } from './slice';

export function setActiveView(viewId, plateId) {
  return (dispatch, getState) => {
    dispatch(actions.setActiveView({ viewId, plateId }));
  };
}

export function updateViewData(viewId, data) {
  return (dispatch, getState) => {
    dispatch(actions.updateViewData({ viewId, data }));
  };
}

export function getOverview(active) {
  return {
    id: 'Overview',
    name: 'Overview',
    active,
    data: {},
  };
}

export function getPlateEditor(active) {
  return {
    id: 'PlateEditor',
    name: 'Plate Editor',
    active,
    data: {
      selectedSizeOption: 'Medium',
      sizeOptions: [
        {
          name: 'Small',
          settings: {
            columnHeaderCellHeight: 24,
            columnHeaderCellWidth: 100,
            columnHeaderCellMarginRight: 4,
            columnHeaderBottomMargin: 4,
            rowHeaderCellHeight: 100,
            rowHeaderCellWidth: 24,
            rowHeaderCellMarginBottom: 4,
            rowHeaderRightMargin: 4,
            wellHeight: 100,
            wellWidth: 100,
            wellMarginRight: 4,
            wellMarginBottom: 4,
            wellPadding: 4,
            component: {
              compact: true,
            },
          },
        },
        {
          name: 'Medium',
          settings: {
            columnHeaderCellHeight: 24,
            columnHeaderCellWidth: 160,
            columnHeaderCellMarginRight: 4,
            columnHeaderBottomMargin: 4,
            rowHeaderCellHeight: 160,
            rowHeaderCellWidth: 24,
            rowHeaderCellMarginBottom: 4,
            rowHeaderRightMargin: 4,
            wellHeight: 160,
            wellWidth: 160,
            wellMarginRight: 4,
            wellMarginBottom: 4,
            wellPadding: 6,
            component: {
              compact: false,
            },
          },
        },
        {
          name: 'Large',
          settings: {
            columnHeaderCellHeight: 24,
            columnHeaderCellWidth: 200,
            columnHeaderCellMarginRight: 4,
            columnHeaderBottomMargin: 4,
            rowHeaderCellHeight: 200,
            rowHeaderCellWidth: 24,
            rowHeaderCellMarginBottom: 4,
            rowHeaderRightMargin: 4,
            wellHeight: 200,
            wellWidth: 200,
            wellMarginRight: 4,
            wellMarginBottom: 4,
            wellPadding: 6,
            component: {
              compact: false,
            },
          },
        },
      ],
    },
  };
}

export function getPlateTable(active) {
  return {
    id: 'PlateTable',
    name: 'Plate Table',
    active,
    data: {},
  };
}
