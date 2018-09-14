import { map, compact } from 'lodash';
import { VALID_PARAMS } from './constants';

export const generateQueryString = (opts = { params: {}, display: false }) => {
  const queryParams = map(opts.params, (v, k) => {
    if (!!v) {
      if (opts.display && (k === 'limit' || k === 'offset' || k === 'append')) {
        return null;
      }
      return `${k}=${v}`;
    }
  });
  const compacted = compact(queryParams);
  const queryString = compacted.join('&');

  return queryString;
};

export const parseQueryString = (queryString, params = {}) => {
  VALID_PARAMS.map(paramKey => {
    const regex = new RegExp(`${paramKey}=(.+?)(?=&|$)`);
    const match = regex.exec(queryString);
    if (match) {
      const val = match[1];
      return params[paramKey] = val;
    }

    return null;
  });

  return params;
};
