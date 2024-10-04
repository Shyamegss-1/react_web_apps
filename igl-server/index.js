const express = require("express");
const app = express();
require("dotenv").config();
const formData = require("express-form-data");
const bodyParser = require("body-parser");
// files

const { category } = require("./controller/category");
const auth = require("./controller/adminLogin");

const PORT = process.env.PORT;

//middlewares

app.use(formData.parse());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routing
const routes = express.Router();

app.use("/api/v1", routes);
routes.route("/category").get(category);
routes.route("/auth").post(auth);

app.listen(PORT, () => {
  console.log("listing to Port" + " " + PORT);
});

// category controllers , login controller with jWt token..
