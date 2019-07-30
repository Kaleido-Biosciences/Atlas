export const groupComponents = components => {
  const groups = {
    communities: [],
    compounds: [],
    media: [],
    supplements: [],
  };
  components.forEach(component => {
    let key;
    if (component.type === 'community') {
      key = 'communities';
    } else if (component.type === 'compound') {
      key = 'compounds';
    } else if (component.type === 'medium') {
      key = 'media';
    } else if (component.type === 'supplement') {
      key = 'supplements';
    }
    groups[key].push(component);
  });
  return groups;
};
