import * as fetch from './fetch';
import * as aws from './aws';

export const api = {
  ...fetch,
  ...aws,
};
