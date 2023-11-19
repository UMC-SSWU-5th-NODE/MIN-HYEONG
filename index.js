import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3006;

const app = express();
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: port,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
