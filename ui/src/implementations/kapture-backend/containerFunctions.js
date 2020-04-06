import {
  createComponent,
  createContainer,
  createGrid,
  createGridData,
  addContainersToGrid,
} from '../../models';
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
    timepoints: timepoints.map((timepoint) => {
      return Object.assign({}, timepoint);
    }),
  };
  return createComponent({
    id,
    type,
    displayName,
    description,
    options,
    color,
    data: kaptureData,
  });
};

const exportContainers = (containers) => {
  const exportedContainers = containers.map((container, i) => {
    let exported;
    if (container.type === 'ContainerGrid') {
      exported = exportGrid(container, i + 1);
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
  if (container.components) {
    exportedContainer.data.push(exportContainerData(container, 'A', 1));
  }
  return exportedContainer;
};

const exportGrid = (grid, id) => {
  const exportedGrid = {
    id,
    rows: grid.dimensions.rows,
    columns: grid.dimensions.columns,
    name: grid.name || null,
    containerType: grid.subtype || null,
    barcode: grid.barcode || null,
    data: [],
  };
  if (grid.data && grid.data.length) {
    const positions = grid.data.flat();
    positions.forEach((position) => {
      if (position.container) {
        exportedGrid.data.push(
          exportContainerData(position.container, position.row, position.column)
        );
      }
    });
  }
  return exportedGrid;
};

function exportContainerData(container, row, column) {
  const containerData = {
    name: container.name || null,
    containerType: container.subtype || null,
    row: row || null,
    col: column || null,
    barcode: container.barcode || null,
    components: [],
    attributes: [],
  };
  if (container.components && container.components.length) {
    container.components.forEach((component) => {
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

const importContainer = (containerData, kaptureComponents) => {
  const editorComponents = containerData.components.map((component) => {
    const kaptureComponent = kaptureComponents[component.type].find(
      (kaptureComponent) => kaptureComponent.id === component.id
    );
    return createEditorComponentFromKaptureData(
      kaptureComponent,
      component.type,
      component.timepoints
    );
  });
  const editorAttributes = containerData.attributes.map(
    ({ key, value, value_type, value_unit }) => {
      const id = value ? (key + '_' + value).replace(/ /g, '_') : key;
      const unit = value ? (value_unit ? value_unit : '') : '';
      const displayName = value ? key + '(' + value + unit + ')' : key;
      return createComponent({
        id,
        type: COMPONENT_TYPE_ATTRIBUTE,
        displayName,
        data: {
          id: id,
          name: displayName,
          key: key,
          value: value,
          value_type: value_type,
          value_unit: value_unit,
        },
      });
    }
  );
  const containerComponents = editorComponents.concat(editorAttributes);
  return createContainer({
    subtype: containerData.containerType,
    barcode: containerData.barcode,
    components: containerComponents,
  });
};

const importGrid = (importData, kaptureComponents) => {
  const gridData = createGridData({
    rows: importData.rows,
    columns: importData.columns,
  });
  const grid = createGrid({
    subtype: importData.containerType,
    barcode: importData.barcode,
    dimensions: { rows: importData.rows, columns: importData.columns },
    gridData,
  });
  const containerPositions = importData.data.map((containerData) => {
    return {
      row: containerData.row,
      column: containerData.col,
      container: importContainer(containerData, kaptureComponents),
    };
  });
  addContainersToGrid(grid, containerPositions);
  return grid;
};

function getDisplayName(data) {
  let displayName = data.name;
  if (data.alias) {
    //For communities
    displayName += ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    //This is for compounds
    data.aliases.forEach(
      (aliasElement) => (displayName += ` : (${aliasElement.alias})`)
    );
  }
  return displayName;
}

function getDescription(timepoints) {
  const timepointStrings = timepoints.map((timepoint) => {
    if (timepoint.concentration) {
      return `${timepoint.concentration.toFixed(2)} @ 
            ${timepoint.time}h`;
    } else return '';
  });
  return timepointStrings.join(', ');
}

export {
  createEditorComponentFromKaptureData,
  exportContainers,
  importContainer,
  importGrid,
};
