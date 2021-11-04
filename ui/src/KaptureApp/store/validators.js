import validate from 'validate.js';

validate.validators.timepoints = function (timepoints) {
  const messages = [];
  let emptyTime = false;
  timepoints.forEach((timepoint) => {
    if (validate.isEmpty(timepoint.time)) {
      emptyTime = true;
    }
  });
  if (emptyTime) {
    messages.push('Time must be specified.');
  }
  return messages;
};
