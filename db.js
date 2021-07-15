require('dotenv').config();
const connection = `mongodb+srv://rob:${process.env.DB_PW}@cluster0.khyej.mongodb.net/kripdoe?retryWrites=true&w=majority`;
const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
    useCreateIndex: true,
  })
  .then(x => {
      console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`,
      );
  })
  .catch(err => {
      console.error('Error connecting to mongo', err);
  });

  return mongoose;
};