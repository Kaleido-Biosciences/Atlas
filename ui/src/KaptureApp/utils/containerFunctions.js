import {
  createComponent,
  createContainer,
  createGrid,
  createGridData,
  addContainersToGrid,
} from 'AtlasUI/models';
import {
  COMPONENT_TYPE_ATTRIBUTE,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_COMPOUND,
} from 'KaptureApp/config/componentTypes';
import { DEFAULT_COMPONENT_COLOR_CODES } from 'KaptureApp/config/constants';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const createEditorComponentFromKaptureData = (
  kaptureData,
  type,
  timepoints
) => {
  return createComponent({
    id: `${type.toUpperCase()}_${kaptureData.id}`,
    type,
    name: getName(kaptureData),
    description: getDescription(timepoints),
    options: {
      timepoints: timepoints.map((timepoint) => {
        return Object.assign({}, timepoint);
      }),
    },
    color: DEFAULT_COMPONENT_COLOR_CODES[type],
    data: kaptureData,
    tooltip: getComponentTooltip(kaptureData, type),
  });
};

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
        exportedContainer.attributes.push({
          key: component.data.key,
          value: component.data.value,
          value_type: component.data.value_type,
          value_unit: component.data.value_unit,
        });
      } else {
        exportedContainer.components.push({
          type: component.type,
          id: component.data.id,
          timepoints: component.options.timepoints,
        });
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
      const name = value ? key + ': ' + value + unit : key;
      return createComponent({
        id,
        type: COMPONENT_TYPE_ATTRIBUTE,
        name,
        data: {
          id: id,
          name,
          key: key,
          value: value,
          value_type: value_type,
          value_unit: value_unit,
        },
        color: DEFAULT_COMPONENT_COLOR_CODES[COMPONENT_TYPE_ATTRIBUTE],
      });
    }
  );
  const containerComponents = editorComponents.concat(editorAttributes);
  return createContainer({
    containerType: containerData.containerType,
    barcode: containerData.barcode,
    components: containerComponents,
  });
};

const getName = (data) => {
  let name = data.name;
  if (data.alias) {
    //For communities
    name += ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    //This is for compounds
    data.aliases.forEach(
      (aliasElement) => (name += ` : (${aliasElement.alias})`)
    );
  }
  return name;
};

const getDescription = (timepoints) => {
  const timepointStrings = timepoints.map((timepoint) => {
    if (timepoint.concentration) {
      return `${timepoint.concentration.toFixed(2)} @ 
            ${timepoint.time}h`;
    } else return '';
  });
  return timepointStrings.join(', ');
};

const getComponentTooltip = (data, type) => {
  const tooltip = [];
  if (type === COMPONENT_TYPE_SUPPLEMENT) {
    if (data.source) {
      tooltip.push({ key: 'Source', value: data.source });
    }
    if (data.registrationDate) {
      tooltip.push({ key: 'Registration Date', value: data.registrationDate });
    }
  } else if (type === COMPONENT_TYPE_COMPOUND) {
    if (data.aveDP) {
      tooltip.push({
        key: 'Avg. DP',
        value: data.aveDP.toFixed(2),
      });
    }
    if (data.glycanComposition) {
      tooltip.push({
        key: 'Glycan Composition',
        value: data.glycanComposition,
      });
    }
    if (data.dataRecordName) {
      tooltip.push({ key: 'Data record name', value: data.dataRecordName });
    }
    if (data.createdBy) {
      tooltip.push({ key: 'Created by', value: data.createdBy });
    }
    if (data.dateCreated) {
      tooltip.push({
        key: 'Created date',
        value: formatDate(data.dateCreated),
      });
    }
    if (data.notes) {
      tooltip.push({ key: 'Notes', value: data.notes });
    }
  }
  return tooltip;
};

const formatDate = (iso_text) => {
  let d = new Date(iso_text),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export { exportGrids, importGrids };
