const Order = require("../models/order.model.js");
exports.save = (req, res) => {
  Order.save(req, res);
};