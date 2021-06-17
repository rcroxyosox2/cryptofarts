require('dotenv').config()
const express = require('express'); 
const fetch = require("node-fetch");
const CoinGecko = require('coingecko-api');
const path = require('path')
const app = express(); 
const port = process.env.PORT || 5000; 
const CoinGeckoClient = new CoinGecko();

// This displays message that the server running and listening to specified port
// Hello there world
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
      if (pageData.length > 0 && currentPage < 4) {
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
    console.log(error.message);
    res.status(500).send({
      bad: 'too bad'
    });
  }

  
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})