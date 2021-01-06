const express = require('express');

const createRouter = function (collection) {

  const router = express.Router();

  // Setup GET router - listen for GET requests on '/'.
  // Although there is a 'response' parameter (and nothing coming in
  // from im), it is there as a ...?
  router.get("/", (request, response) => {

    // find all data in the collection (the documents), convert 
    // it to an array
    collection.find().toArray().then((docs ) => {
      response.send(docs);
    });

  });

  return router;

};

module.exports = createRouter;
