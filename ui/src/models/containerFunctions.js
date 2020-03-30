import { COMPONENT_TYPE_ATTRIBUTE } from '../constants';

export function exportContainers(containers) {
  const exportedContainers = containers.map((container, i) => {
    let exported;
    if (container.type === 'ContainerGrid') {
      exported = exportContainerGrid(container, i + 1);
    } else if (container.type === 'Container') {
      exported = exportContainer(container, i + 1);
    }
    return exported;
  });
  return exportedContainers;
}

export function exportContainer(container, id) {
  const exportedContainer = {
    id: id || null,
    rows: 1,
    columns: 1,
    name: container.name || null,
    containerType: container.subType || null,
    barcode: container.barcode || null,
    data: [],
  };
  if (container.components && container.components.length) {
    exportedContainer.data.push(exportContainerData(container, 'A', 1));
  }
  return exportedContainer;
}

export function exportContainerGrid(containerGrid, id) {
  const exportedContainerGrid = {
    id,
    rows: containerGrid.dimensions.rows,
    columns: containerGrid.dimensions.columns,
    name: containerGrid.name || null,
    containerType: containerGrid.subType || null,
    barcode: containerGrid.barcode || null,
    data: [],
  };
  if (containerGrid.grid && containerGrid.grid.length) {
    const positions = containerGrid.grid.flat();
    positions.forEach(position => {
      if (position.container) {
        exportedContainerGrid.data.push(
          exportContainerData(position.container, position.row, position.column)
        );
      }
    });
  }
  return exportedContainerGrid;
}

function exportContainerData(container, row, column) {
  const containerData = {
    name: container.name || null,
    containerType: container.subType || null,
    row: row || null,
    col: column || null,
    components: [],
    attributes: [],
  };
  if (container.components && container.components.length) {
    container.components.forEach(component => {
      if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
        containerData.attributes.push({
          key: component.data.key,
          value: component.data.value,
          value_type: component.data.value_type,
          value_unit: component.data.value_unit,
        });
      } else {
        containerData.components.push({
          type: component.type,
          id: component.data.id,
          timepoints: component.options.timepoints,
        });
      }
    });
  }
  return containerData;
}
