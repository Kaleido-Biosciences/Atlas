import validate from 'validate.js';

validate.validators.timepoints = function (timepoints) {
  const messages = [];
  let emptyTime = false;
  let unitWithoutConcentration;
  timepoints.forEach((timepoint) => {
    if (validate.isEmpty(timepoint.time)) {
      emptyTime = true;
    }
    if (
      validate.isEmpty(timepoint.concentration) &&
      timepoint.concentrationUnit !== null
    ) {
      unitWithoutConcentration = true;
    }
  });
  if (emptyTime) {
    messages.push('Time must be specified.');
  }
  if (unitWithoutConcentration) {
    messages.push('Unit selected without concentration');
  }
  return messages;
};
