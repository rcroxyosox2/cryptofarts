// require('../db');
const Meta = require('../models/Meta');

const getMeta = () => {
  return Meta.Schema.findOne({});
};

module.exports = {
  getMeta,
}
