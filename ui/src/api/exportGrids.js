import {
  COMPONENT_TYPE_ATTRIBUTE,
  exportComponent,
} from 'KaptureApp/config/componentTypes';

export const exportGrids = (grids) => {
  const exportedGrids = grids.map((grid) => {
    return exportGrid(grid);
  });
  return exportedGrids;
};

function exportGrid(grid) {
  const exportedGrid = {
    id: grid.id,
    rows: grid.dimensions.rows,
    columns: grid.dimensions.columns,
    name: grid.name || null,
    containerType: grid.containerType || null,
    barcode: grid.barcode || null,
    data: [],
  };
  if (grid.positions && grid.positions.length) {
    grid.positions.forEach((position) => {
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
