import {
  createContainer,
  createGrid,
  createGridData,
  addContainersToGrid,
} from 'AtlasUI/models';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  createComponent,
  exportComponent,
} from 'KaptureApp/config/componentTypes';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const exportGrids = (grids) => {
  const exportedGrids = grids.map((grid, i) => {
    return exportGrid(grid, i + 1);
  });
  return exportedGrids;
};

const exportGrid = (grid, id) => {
  const exportedGrid = {
    id,
    rows: grid.dimensions.rows,
    columns: grid.dimensions.columns,
    name: grid.name || null,
    containerType: grid.containerType || null,
    barcode: grid.barcode || null,
    data: [],
  };
  if (grid.data && grid.data.length) {
    const positions = grid.data.flat();
    positions.forEach((position) => {
      if (position.container) {
        exportedGrid.data.push(
          exportContainer(position.container, position.row, position.column)
        );
      }
    });
  }
  return exportedGrid;
};

const exportContainer = (container, row, column) => {
  const exportedContainer = {
    name: container.name || null,
    containerType: container.containerType || null,
    row: row || null,
    col: column || null,
    barcode: container.barcode || null,
    components: [],
    attributes: [],
  };
  if (container.components && container.components.length) {
    container.components.forEach((component) => {
      if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
        exportedContainer.attributes.push(exportComponent(component));
      } else {
        exportedContainer.components.push(exportComponent(component));
      }
    });
  }
  return exportedContainer;
};

const importGrids = (grids, kaptureComponents) => {
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

const importGrid = (importData, kaptureComponents) => {
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
};

const importContainer = (containerData, kaptureComponents) => {
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
};

export { exportGrids, importGrids };
