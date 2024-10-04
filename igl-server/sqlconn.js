const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "local_ikshita",
});

module.exports = pool;
