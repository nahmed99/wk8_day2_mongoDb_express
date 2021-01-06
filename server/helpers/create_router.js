const express = require('express');

const createRouter = function (collection) {

  const router = express.Router();

  // Setup GET router - listen for GET requests on '/'
  router.get("/", () => {

  });

  return router;

};

module.exports = createRouter;
