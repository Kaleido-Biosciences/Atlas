import {
  createContainer,
  createGrid,
  createGridPositions,
  createGridPosition,
  addContainersToGrid,
} from 'models';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  createComponent,
} from 'KaptureApp/config/componentTypes';

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
  const gridPositions = createGridPositions({
    rows: importData.rows,
    columns: importData.columns,
  });
  const grid = createGrid({
    id: importData.id,
    containerType: importData.containerType,
    barcode: importData.barcode,
    dimensions: { rows: importData.rows, columns: importData.columns },
    positions: gridPositions,
    name: importData.name,
  });
  const containerPositions = importData.data.map((containerData) => {
    return createGridPosition(
      containerData.row,
      containerData.col,
      importContainer(containerData, kaptureComponents)
    );
  });
  addContainersToGrid(grid, containerPositions);
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
