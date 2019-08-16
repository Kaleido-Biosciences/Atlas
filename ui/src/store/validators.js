import validate from 'validate.js';

validate.validators.timepoints = function(timepoints) {
  const messages = [];
  let emptyTime = false,
    invalidTime = false,
    emptyConcentration = false,
    invalidConcentration = false,
    duplicateTime = false;
  const times = [];
  timepoints.forEach(timepoint => {
    const { time, concentration } = timepoint;
    if (validate.isEmpty(time)) {
      emptyTime = true;
    }
    if (!validate.isNumber(time)) {
      invalidTime = true;
    }
    if (validate.isEmpty(concentration)) {
      emptyConcentration = true;
    }
    if (!validate.isNumber(concentration) || !(concentration > 0)) {
      invalidConcentration = true;
    }
    if (times.includes(timepoint.time)) {
      duplicateTime = true;
    } else {
      times.push(timepoint.time);
    }
  });
  if (emptyTime) {
    messages.push('Time must be specified.');
  }
  if (invalidTime) {
    messages.push('Time must be a number.');
  }
  if (emptyConcentration) {
    messages.push('Concentration must be specified.');
  }
  if (invalidConcentration) {
    messages.push('Concentration must be a number > 0.');
  }
  if (duplicateTime) {
    messages.push('Times must be unique.');
  }
  return messages;
};