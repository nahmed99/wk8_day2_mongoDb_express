const express = require('express');
const ObjectID = require('mongodb').ObjectID;
// const { ReplSet } = require('mongodb');

const createRouter = function (collection) {


  // You can use insomnia to test each of these routes - as you are creating them...


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

    // res.send("placeholder GET"); // This will show up in Insomnia - if you are using it!


    const id = req.params.theId;
    
    // You could use other fields and data here too - but it might 
    // (try to?) return mulitple records, or the first one it comes
    // across - might not be the one you are look for.
    collection.findOne({ _id: ObjectID(id) })
    .then((doc) => {   // successful response from the database
      return res.json(doc);  // you could also use res.send(doc) - as the data is in json format already. This return needs to be here because it is from a promise, and it will only be returned once ready (asynchronous...)
    });
  });


  // Create route
  // POST /
  router.post("/", (req, res) => {

    // res.send("placeholder POST"); // This will show up in Insomnia - if you are using it!

    // get the body (data) from the request
    const newData = req.body;    

    // take the body and save it to the DB
    collection.insertOne(newData)
    .then((result) => {

      // generate and return a suitable (?) response+  
      res.json(result.ops[0]);
      // res.json(result.ops); // Will return the whole result of the insert into the database - including success (etc) codes etc.

    });
  });

  // Update route - could use PUT, PATCH, or even POST for this one.
  // PUT /:id
  router.put("/:id", (req, res) => {
    // res.send("placeholder UPDATE"); // This will show up in Insomnia - if you are using it!

    const id = req.params.id;
    const updatedData = req.body;

    // Find the document with the matching id, then set (update) the
    // data that has been changed.
    collection.updateOne(
                  { _id: ObjectID(id) }, 
                  { $set: updatedData }
    ).then((result) => {    // successful update...
      res.json(result);  // result of the update, including success messages and codes etc
      // res.send("That's the update done"); - You can send your own custom message
    });
  });


  // Delete route - could use DELETE or DELETEALL(?). But DELETE is safer!
  // DELETE /:id
  router.delete("/:id", (req, res) => {
    // res.send("placeholder DELETE"); // This will show up in Insomnia - if you are using it!

    const id = req.params.id;
    collection.deleteOne({ _id: ObjectID(id) })
    .then((result) => {
      return res.json(result);
    });
  });



  return router;

};

module.exports = createRouter;
