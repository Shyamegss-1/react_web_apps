const db = require("../sqlconn");

const admin = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query("SELECT * FROM auth ", function (error, result) {
      if (email && password) {
        let authEmail = result[0].email;
        let authPassord = result[0].password;

        if (authPassord == password && authEmail == email) {
          res.status(200).json({ message: "success ", data: result });
        } else if (authPassord !== password || authEmail !== email) {
          res.status(401).json({ message: "Unauthorized user" });
        }
      } else if (!email || !password) {
        res.status(201).json({ message: "please enter the require fields" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "something went wrong", error: error });
  }
};

module.exports = admin;
