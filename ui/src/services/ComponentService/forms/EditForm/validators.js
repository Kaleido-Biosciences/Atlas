import validate from 'validate.js';

validate.validators.timepoints = function (timepoints) {
  const messages = [];
  let unitWithoutTime;
  let unitWithoutConcentration;
  timepoints.forEach((timepoint) => {
    if (validate.isEmpty(timepoint.time) && timepoint.timeUnit !== null) {
      unitWithoutTime = true;
    }
    if (
      validate.isEmpty(timepoint.concentration) &&
      timepoint.concentrationUnit !== null
    ) {
      unitWithoutConcentration = true;
    }
  });
  if (unitWithoutTime) {
    messages.push('Unit selected without time');
  }
  if (unitWithoutConcentration) {
    messages.push('Unit selected without concentration');
  }
  return messages;
};
