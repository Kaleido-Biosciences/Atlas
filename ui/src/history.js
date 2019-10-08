const createHistory = require("ui/src/history").createBrowserHistory;

export default createHistory({
  basename: process.env.NODE_ENV === 'development' ? '' : '/'
});
