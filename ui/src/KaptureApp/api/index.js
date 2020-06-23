import * as kapture from './kapture';
import * as aws from './aws';

export const api = {
  ...aws,
  ...kapture,
};
