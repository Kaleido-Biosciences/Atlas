import * as kapture from './kapture';
import * as aws from './aws';
import * as atlas from './atlas';
import { exportGrids } from './exportGrids';

export const api = {
  ...aws,
  ...kapture,
  ...atlas,
  exportGrids,
};
