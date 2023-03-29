const { Pool } = require("pg");

var dbConnection = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
  max: 30,
  min: 0,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 100,
  allowExitOnIdle: true
});



module.exports = dbConnection;
