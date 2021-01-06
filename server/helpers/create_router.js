const express = require('express');
const ObjectID = require('mongodb').ObjectID;
// const { ReplSet } = require('mongodb');

const createRouter = function (collection) {

  const router = express.Router();

  // Setup GET router - listen for GET requests on '/'.
  // Although there is a 'response' parameter (and nothing coming in
  // from im), it is there as a ...? Both request and response come from express.js
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
  router.get("/:theId", (req, res) => {
    const id = req.params.theId;
    
    collection.findOne({ _id: ObjectID(theId) });  // You could use other fields and data here too - but might (try to?) return mulitple records, or the first one it comes across - might not be the one you are look for.
  });


  // Create route
  // POST /
  router.post("/", (req, res) => {
    res.send("placeholder POST/create response");
  })

  // Update route - could use PUT, PATCH, or even POST for this one.
  // PUT /:id
  router.put("/:id", (req, res) => {
    res.send("placeholder for PUT/update.")
  });


  // Delete route - could use DELETE or DELETEALL(?). But DELETE is safer!
  // DELETE /:id
  router.delete("/:id", (req, res) => {
    res.send("placeholder DELETE");
  });



  return router;

};

module.exports = createRouter;
