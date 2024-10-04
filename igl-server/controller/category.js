const db = require("../sqlconn");

const category = async (req, res) => {
  try {
    db.query("select * from product_categories", (err, result) => {
      res.status(200).json({ message: "success", data: result });
    });
  } catch (err) {
    res.status(400).json({ message: "failed", data: err.message });
  }
};

module.exports = { category };
