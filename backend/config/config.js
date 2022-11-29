require("dotenv").config();
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

module.exports = {
  development: {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    dialect: "postgres",
  },
};
