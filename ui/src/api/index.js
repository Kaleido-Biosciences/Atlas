import * as kapture from './kapture';
import * as aws from './aws';
import * as atlas from './atlas';

export const api = {
  ...aws,
  ...kapture,
  ...atlas,
};
