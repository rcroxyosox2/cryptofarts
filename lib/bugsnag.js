/* eslint-disable import/no-mutable-exports */
require('dotenv').config()
const Bugsnag = require('@bugsnag/js');

let BugsnagClient;

const validBugsnagEnvironments = ['production', 'staging'];

if (process.env.REACT_APP_BUGSNAG_API_KEY && validBugsnagEnvironments.includes(process.env.REACT_APP_ENV)) {
  BugsnagClient = Bugsnag;
  BugsnagClient.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    releaseStage: process.env.REACT_APP_ENV
  });
}

else {
  // When there is no key, return a stubbed mock of the client that console errors
  BugsnagClient = {
    notify: (e) => {
      if (process.env.REACT_APP_ENV !== 'test') {
        console.warn('BUGSNAG_CLIENT - No API Key or in dev mode - Client mock placeholder in bugsnagClient');
        console.error(e);
      }
    },
  };
}

module.exports = BugsnagClient;
