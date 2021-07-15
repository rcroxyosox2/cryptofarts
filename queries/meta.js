const mongo = require('../db');
const Meta = require('../models/Meta');

const getMeta = async () => {
  await mongo();
  return Meta.Schema.findOne({});
};

// (async function() {
//   try {
//     await mongo();
//     const x = await getMeta();
//     console.log(x);
//   } catch (e) {
//     console.log(e);
//   }
// })();

module.exports = {
  getMeta,
}
