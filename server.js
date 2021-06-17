require('dotenv').config()
const express = require('express'); 
const fetch = require("node-fetch");
const CoinGecko = require('coingecko-api');
const app = express(); 
const port = process.env.PORT; 
const CoinGeckoClient = new CoinGecko();

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/express_backend', async(req, res) => {

  async function getPage(page) {
    const response = await CoinGeckoClient.coins.markets({
      per_page: 250,
      page
    });
    return response.data;
  }

  async function getPages() {
    let currentPage = 1;
    let stilGoing = true;
    let finalArr = [];
    while(stilGoing) {
      const pageData = await getPage(currentPage);
      if (pageData.length > 0 && currentPage < 40) {
        finalArr.push(...pageData);
        currentPage++;
      } else {
        stilGoing = false;
      }
    }
    return finalArr;
  }

  try {
    const data = await getPages();
    console.log('comp;letecomp;letecomp;letecomp;letecomp;letecomp;letecomp;letecomp;lete', data.length);
    res.send({hello: data.length});
  } catch(error) {
    console.log(error);
    res.status(500).send({
      bad: error.message
    });
  }

  
});
