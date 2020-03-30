import { createComponent } from '../../models';
import {
  DEFAULT_COMPONENT_COLOR_CODES,
  COMPONENT_TYPE_ATTRIBUTE,
} from '../../constants';

const createEditorComponentFromKaptureData = (
  kaptureData,
  type,
  timepoints
) => {
  const id = `${type.toUpperCase()}_${kaptureData.id}`;
  const displayName = getDisplayName(kaptureData);
  const description = getDescription(timepoints);
  const color = DEFAULT_COMPONENT_COLOR_CODES[type];
  const options = {
    timepoints: timepoints.map(timepoint => {
      return Object.assign({}, timepoint);
    }),
  };
  return createComponent(
    id,
    type,
    displayName,
    description,
    options,
    null,
    color,
    kaptureData
  );
};

const exportContainers = containers => {
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
};

const exportContainer = (container, id) => {
  const exportedContainer = {
    id: id || null,
    rows: 1,
    columns: 1,
    name: container.name || null,
    containerType: container.subtype || null,
    barcode: container.barcode || null,
    data: [],
  };
  if (container.components && container.components.length) {
    exportedContainer.data.push(exportContainerData(container, 'A', 1));
  }
  return exportedContainer;
};

const exportContainerGrid = (containerGrid, id) => {
  const exportedContainerGrid = {
    id,
    rows: containerGrid.dimensions.rows,
    columns: containerGrid.dimensions.columns,
    name: containerGrid.name || null,
    containerType: containerGrid.subtype || null,
    barcode: containerGrid.barcode || null,
    data: [],
  };
  if (containerGrid.grid && containerGrid.grid.length) {
    const positions = containerGrid.grid.flat();
    positions.forEach(position => {
      if (position.container && position.container.components.length) {
        exportedContainerGrid.data.push(
          exportContainerData(position.container, position.row, position.column)
        );
      }
    });
  }
  return exportedContainerGrid;
};

function exportContainerData(container, row, column) {
  const containerData = {
    name: container.name || null,
    containerType: container.subtype || null,
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

function getDisplayName(data) {
  let displayName = data.name;
  if (data.alias) {
    //For communities
    displayName += ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    //This is for compounds
    data.aliases.forEach(
      aliasElement => (displayName += ` : (${aliasElement.alias})`)
    );
  }
  return displayName;
}

function getDescription(timepoints) {
  const timepointStrings = timepoints.map(timepoint => {
    if (timepoint.concentration) {
      return `${timepoint.concentration.toFixed(2)} @ 
            ${timepoint.time}h`;
    } else return '';
  });
  return timepointStrings.join(', ');
}

export { createEditorComponentFromKaptureData, exportContainers };
