/* eslint-disable import/no-mutable-exports */
import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

let BugsnagClient;
let ErrorBoundry;

const env = (process.env.REACT_APP_ENV || process.env.NODE_ENV);

const validBugsnagEnvironments = ['production', 'staging'];
if (process.env.REACT_APP_BUGSNAG_API_KEY && validBugsnagEnvironments.includes(env)) {
  BugsnagClient = Bugsnag;
  BugsnagClient.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    releaseStage: env,
    plugins: [new BugsnagPluginReact()],
  });

  ErrorBoundry = BugsnagClient.getPlugin('react').createErrorBoundary(React);
}
else {
  // When there is no key, return a stubbed mock of the client that console errors
  BugsnagClient = {
    notify: (e) => {
      if (env !== 'test') {
        console.warn('BUGSNAG_CLIENT - No API Key or in dev mode - Client mock placeholder in bugsnagClient');
        console.error(e);
      }
    },
  };

  ErrorBoundry = ({ children }) => {
    if (env !== 'test') {
      console.warn('BUGSNAG_CLIENT - No API Key or in dev mode - Client mock placeholder in ErrorBoundry');
    }
    return children;
  };
}

export default BugsnagClient;
export { ErrorBoundry };
