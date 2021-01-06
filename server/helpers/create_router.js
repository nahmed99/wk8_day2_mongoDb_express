const express = require('express');
const { ReplSet } = require('mongodb');

const createRouter = function (collection) {

  const router = express.Router();

  // Setup GET router - listen for GET requests on '/'.
  // Although there is a 'response' parameter (and nothing coming in
  // from im), it is there as a ...?
  router.get("/", (request, response) => {

    // find all data in the collection (the documents), convert 
    // it to an array
    collection.find().toArray().then((docs ) => {
      // response.send(docs); // send the data as is - it is in JSON format...
      response.json(docs); // convert to JSON and send
    });

  });



  // If you don't send a response to a request, then the client side will hang - indefinitely?


  // Show route
  // GET /:id
  router.get("/:id", (req, res) => {
    res.send("Placeholder!");
  });


  // Create route
  // POST /
  router.post("/", (req, res) => {
    res.send("placeholder post response");
  })

  // Update route - could use PUT, PATCH, or even POST
  // PUT /:id
  router.put("/:id", (req, res) => {
    res.send("placeholder for put.")
  });



  return router;

};

module.exports = createRouter;
