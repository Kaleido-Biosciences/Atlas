export function getActivePlateMap(plateMaps) {
  if (plateMaps.length > 0) {
    return plateMaps.find(plateMap => plateMap.active);
  } else return null;
}

export function getSelectedWells(plateMap) {
  const flat = plateMap.data.flat();
  return flat.filter(well => well.selected);
}
