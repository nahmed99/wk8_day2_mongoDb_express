const express = require('express');
const app = express();
const parser = require('body-parser');

// Connect to the mongodb client
const MongoClient = require('mongodb').MongoClient; 
const createRouter = require('./helpers/create_router');

app.use(parser.json());

// Make the database connection - this is the port that it 'runs' on.
MongoClient.connect('mongodb://localhost:27017')
.then((client) => {     //client it the response from mongo
  const db = client.db('games_hub');
  const gamesCollection = db.collection("games"); //get access to games collection

  // setup the games router - so that we can access the data outside of this scope...
  const gamesRouter = createRouter(gamesCollection);

  // send the gamesRouter 'back' for express to use
  app.use('/api/games', gamesRouter);
})
.catch(console.error);  // catch any errors in making the connection



app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
