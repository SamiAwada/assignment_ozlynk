const { Pool } = require("pg");

var dbConnection = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
  max: 20,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 2000
});

dbConnection.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
});

dbConnection.on("release", (err, client) => client);

module.exports = dbConnection;
