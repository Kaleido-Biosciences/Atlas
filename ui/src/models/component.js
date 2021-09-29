export const createComponent = ({
  id = null,
  type = null,
  name = null,
  description = null,
  options = {},
  tooltip = [],
  color = null,
  data = null,
}) => {
  return {
    id,
    type,
    name,
    description,
    options,
    tooltip,
    color: color || '#9a9a9a',
    data,
  };
};
