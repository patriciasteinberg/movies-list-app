import mySQL from "mysql";
import dbConfig from "../config/db.config.js";

const connection = mySQL.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database");
});

export default connection;
