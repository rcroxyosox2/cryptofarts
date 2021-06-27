require('dotenv').config()
const logdna = require('@logdna/logger');

const options = {
  app: 'kripdoe', 
  level: 'debug' // set a default for when level is not provided in function calls
};

const logger = logdna.createLogger(process.env.REACT_APP_LOGDNA_KEY, options);

// logger.log('This is an INFO statement', 'info');
// for(let i = 0; i < 20; i++) {
//   logger.log('test statement');
// }



// logger.info('This is an INFO statement using a convenience method');

// logger.info({
//   message: 'Got some user data', 
//   userId: 1234 // This assumes `req.params` comes from some HTTP framework
// });

// Just sets `level: 'error'` automatically
// logger.error('An error was encountered while processing user data');

module.exports = logger;
