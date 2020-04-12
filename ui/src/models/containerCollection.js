import moment from 'moment';
import uuidv1 from 'uuid/v1';

export const createContainerCollection = (
  name,
  createdTime,
  updatedTime,
  icon,
  containerCount,
  route,
  tooltip,
  data
) => {
  let formattedUpdatedTime = '-';
  if (updatedTime) {
    const updatedMoment = moment(updatedTime);
    formattedUpdatedTime = updatedMoment.format('MMMM Do YYYY, h:mm a');
  }
  return {
    id: uuidv1(),
    name,
    createdTime,
    updatedTime,
    formattedUpdatedTime,
    icon,
    containerCount,
    route,
    tooltip,
    containers: [],
    data,
  };
};
