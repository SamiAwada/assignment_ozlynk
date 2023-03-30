const { Pool } = require("pg");

var dbConnection = new Pool({
  user: "postgres",
  host: "ozlynk.c73fiaf3uw7l.eu-north-1.rds.amazonaws.com",
  database: "postgres",
  password: "Ozlynk#123456",
  port: 1521,
  max: 30,
  min: 0,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 100,
  allowExitOnIdle: true
});



module.exports = dbConnection;
