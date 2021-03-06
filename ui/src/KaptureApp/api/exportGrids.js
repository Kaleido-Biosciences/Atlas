import {
  COMPONENT_TYPE_ATTRIBUTE,
  exportComponent,
} from 'KaptureApp/config/componentTypes';

export const exportGrids = (grids) => {
  const exportedGrids = grids.map((grid, i) => {
    return exportGrid(grid, i + 1);
  });
  return exportedGrids;
};

function exportGrid(grid, id) {
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
}

function exportContainer(container, row, column) {
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
}
