import { LocationType } from './../../types/index';

/**
 * Takes list of locations ids and joins them in string format with comma separation. ie: [{id: 234}, {id: 678}] = '234, 678'
 * @param {LocationType}
 * @returns {string}
 */

export const formatLocationIds = (locations: LocationType[]) => {
  const locationIds = locations.reduce(
    (acc, location) => (acc ? `${acc},${location.id}` : `${location.id}`),
    ''
  );
  return locationIds;
};
