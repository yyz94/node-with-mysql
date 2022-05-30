module.exports = app => {
  const orders = require("../controllers/order.controller.js");
  var router = require("express").Router();
  router.post("/order", orders.save);
  app.use('/api', router);
};