require('dotenv').config();
require('./db');
const express = require('express'); 
const cors = require('cors');
const http = require('http');
const path = require('path');
// const request = require('request');
// const updateExchangesTask = require('./crons/updateExchanges');
const { Server } = require('socket.io');

// crons
const updateCoinsTask = require('./crons/updateCoins');
const updateExchangesTask = require('./crons/updateExchanges');
const recordCelebAdviceTask = require('./crons/recordCelebAdvice');
const updateMetasTask = require('./crons/updateMetas');
const updateCoinMarketDataTask = require('./crons/updateCoinMarketData');
const updateCoinCoreDataTask = require('./crons/updateCoinCoreData');
const updateCoinEventsTask = require('./crons/updateCoinEvents');

// const coinQueries = require('./queries/coin');
// const fetch = require("node-fetch");

// const reddit = require('./lib/reddit');
const app = express(); 
const port = process.env.PORT || 5000; 

// This displays message that the server running and listening to specified port
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// start a web socket server


// Start any crons
if (process.env.REACT_APP_ENV !== 'development') {
  recordCelebAdviceTask.start();
  updateMetasTask.start();
  updateCoinsTask.start();
  updateExchangesTask.start();
  updateCoinMarketDataTask.start();
  updateCoinCoreDataTask.start();
  updateCoinEventsTask.start();
}

// prep the responses
app.use(express.json());
// app.use(cors());



// app.get('/sickdeals', async (req, res) => {

// });

// app.get('/test', async (req, res) => {
//   // const coins = await coinQueries.getSickDealCoins();
//   // res.send(coins);
//   try {
//     const b = await reddit.getRedditAsMoonShots();
//     // const b = await reddit.getSub();
//     res.send(b)
//   } catch(e) {
//     res.status(500).send({
//       error: e.message
//     });
//   }
// })

// get the season
// app.get('/season', async(req, res) => {
//   const percPriceChange24Hr = await coinQueries.getAvg24hrPriceChangePerc();
// });

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})