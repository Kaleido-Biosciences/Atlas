import { DEFAULT_COMPONENT_COLOR_CODES } from '../constants';
export const createComponent = (
  id,
  type,
  name,
  description,
  options,
  tooltip,
  color,
  data
) => {
  return {
    id,
    type,
    displayName: name,
    description,
    options,
    tooltip,
    color: color || DEFAULT_COMPONENT_COLOR_CODES[type],
    data,
  };
};
