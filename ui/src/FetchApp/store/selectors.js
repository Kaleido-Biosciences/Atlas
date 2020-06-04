import { createSelector } from 'redux-starter-kit';

import { selectors } from 'AtlasUI/store';

const FetchAppSelectors = {
  ...selectors,
};

export { FetchAppSelectors as selectors };
