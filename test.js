require('./db');
const cron = require('node-cron')
const emitter = require('./emitter');

setInterval(() => {
  emitter.emit('test');
}, 3000)
