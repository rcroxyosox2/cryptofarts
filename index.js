require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const path = require('path');
// const connection = `mongodb+srv://rob:${process.env.DB_PW}@cluster0.khyej.mongodb.net/kripdoe?retryWrites=true&w=majority`;
// mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, autoIndex: false});
// const request = require('request');
// const mongoose = require('mongoose');
// const updateCoinsTask = require('./crons/updateCoins');
// const updateExchangesTask = require('./crons/updateExchanges');
const recordCelebAdviceTask = require('./crons/recordCelebAdvice');
// const coinQueries = require('./queries/coin');
// const fetch = require("node-fetch");

// const reddit = require('./lib/reddit');
const app = express(); 
const port = process.env.PORT || 5000; 

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// Start any crons
// updateCoinsTask.start();
// updateExchangesTask.start();
recordCelebAdviceTask.start();

// prep the responses
app.use(express.json());
// app.use(cors());



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