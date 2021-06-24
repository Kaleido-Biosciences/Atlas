import * as kapture from './kapture';
import * as aws from './aws';
import { importGrids } from './importGrids';
import { exportGrids } from './exportGrids';

export const api = {
  ...aws,
  ...kapture,
  importGrids,
  exportGrids,
};
