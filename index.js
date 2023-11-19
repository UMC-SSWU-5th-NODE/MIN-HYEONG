import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import { tempRouter } from "./src/routes/temp.route.js";

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

// router setting
app.use("/temp", tempRouter);

// error handler
app.use((err, req, res, next) => {
  // console.error("?", err.stack);
  // res.status(500).send("Something broke! : ", err.message);

  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.data.status).send(response(err.data));
});
