import { exportContainers } from './containerFunctions';
import { createComponent } from '../../models';
import { DEFAULT_COMPONENT_COLOR_CODES } from '../../constants';

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

export {
  createComponent,
  createContainerCollection,
  createContainer,
  createContainerGrid,
  createGrid,
  createContainersForGrid,
  addContainersToGrid,
} from '../../models';
export { createEditorComponentFromKaptureData, exportContainers };
