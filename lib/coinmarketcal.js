const moment = require('moment');
const fetch = require("node-fetch");
const cheerio = require('cheerio');
const { urlencoded } = require('express');

const getEvents = async (coinName) => {
  const currentDate = moment();
  const futureDate = moment(currentDate).add(4, 'years');
  const prepDate = (date) => encodeURIComponent(date.format('DD/MM/YYYY'))
  const url = `https://coinmarketcal.com/en/?form%5Bdate_range%5D=${prepDate(currentDate)}+-+${prepDate(futureDate)}&form%5Bkeyword%5D=${coinName}&form%5Bsort_by%5D=revelance&form%5Bsubmit%5D=`;
  const body = await fetch(url).then((r) => r.text());
  const $ = cheerio.load(body);
  const eventArticles = $('.row.list-card article');
  return eventArticles.length;
}

// (async function() {
//   const x = await getEvents('safemoon');
//   console.log(x);
// })()

//https://coinmarketcal.com/en/?form%5Bdate_range%5D=28%2F06%2F2021+-+01%2F08%2F2024&form%5Bkeyword%5D=cardano&form%5Bsort_by%5D=&form%5Bsubmit%5D=

module.exports = {
  getEvents,
}