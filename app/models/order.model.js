const sql = require("./db.js");

const save = async (req, res) => {
  const { order_prefix, customer_id , subtotal, tax } = req.body;
  let order_no = "";
  let running_no = "";
  await sql.query(`SELECT running_no FROM orders ORDER BY running_no DESC LIMIT 1`, (err, result) => {
    if (result != undefined && result.length > 0) {
      running_no = parseInt(result[0].running_no) + 1;
      order_no = order_prefix + running_no;
    } else {
      running_no = 1;
      order_no = order_prefix + 1;
    }
    const newOrder = {
      "order_no" : order_no,
      "running_no" : running_no,
      "subtotal" : subtotal,
      "tax" : tax,
      "payable" : subtotal + tax
    };
    sql.query("INSERT INTO orders SET ?", newOrder, (err, result) => {
      if (err) {
        res.status(500).send({
          message : "Order failed"
        })
      }
      res.status(200).send({
        message : "Order created"
      })
    });
  })
}

module.exports = {
  save
}