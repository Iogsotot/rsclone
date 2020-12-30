const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');

function connectToDB(cb) {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('We are connected to mongoDB.');
    cb();
  });
}

module.exports = {
  connectToDB
};
