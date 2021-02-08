export const getName = (data) => {
  let name = data.name;
  if (data.alias) {
    name += ` : (${data.alias})`;
  } else if (data.aliases && data.aliases.length > 0) {
    data.aliases.forEach(
      (aliasElement) => (name += ` : (${aliasElement.alias})`)
    );
  }
  return name;
};

export const getDefaultTimepoints = (concentration, time) => {
  return [{ concentration, time }];
};
