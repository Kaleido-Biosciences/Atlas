import {
  createContainer,
  createGrid,
  createGridData,
  addContainersToGrid,
} from 'AtlasUI/models';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  createComponent,
} from 'KaptureApp/config/componentTypes';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

export const importGrids = (grids, kaptureComponents) => {
  const importData = {
    grids: [],
    barcodes: [],
  };
  grids.forEach((grid) => {
    importData.grids.push(importGrid(grid, kaptureComponents));
    if (grid.barcode) {
      importData.barcodes.push(grid.barcode);
    }
  });
  return importData;
};

function importGrid(importData, kaptureComponents) {
  const gridData = createGridData(
    {
      rows: importData.rows,
      columns: importData.columns,
    },
    GRID_ROW_HEADERS
  );
  const grid = createGrid({
    containerType: importData.containerType,
    barcode: importData.barcode,
    dimensions: { rows: importData.rows, columns: importData.columns },
    data: gridData,
    name: importData.name,
  });
  const containerPositions = importData.data.map((containerData) => {
    return {
      row: containerData.row,
      column: containerData.col,
      container: importContainer(containerData, kaptureComponents),
    };
  });
  addContainersToGrid(grid, containerPositions, GRID_ROW_HEADERS);
  return grid;
}

function importContainer(containerData, kaptureComponents) {
  const editorComponents = containerData.components.map((component) => {
    const kaptureComponent = kaptureComponents[component.type].find(
      (kaptureComponent) => kaptureComponent.id === component.id
    );
    return createComponent(
      kaptureComponent,
      component.type,
      component.timepoints
    );
  });
  const editorAttributes = containerData.attributes.map(
    ({ key, value, value_type, value_unit }) => {
      return createComponent(
        {
          key,
          value,
          valueType: value_type,
          valueUnit: value_unit,
        },
        COMPONENT_TYPE_ATTRIBUTE
      );
    }
  );
  const containerComponents = editorComponents.concat(editorAttributes);
  return createContainer({
    containerType: containerData.containerType,
    barcode: containerData.barcode,
    components: containerComponents,
  });
}
