import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import { response } from "./config/response.js";
import { tempRouter } from "./src/routes/temp.route.js";
import { BaseError } from "./config/error.js";
import { status } from "./config/response.status.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: port,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// in_progress 데이터 추출 쿼리
const inProgressQuery = `
  SELECT
    store.name AS store_name,
    mission.deadline AS due_date,
    store.store_type,
    mission.mission_spec AS mission_description
  FROM
    mission
  JOIN
    store ON mission.store_id = store.id
  WHERE
    mission.status = 'in_progress';
`;

// success 데이터 추출 쿼리
const successQuery = `
  SELECT
    store.name AS store_name,
    mission.deadline AS due_date,
    store.store_type,
    mission.mission_spec AS mission_description
  FROM
    mission
  JOIN
    store ON mission.store_id = store.id
  WHERE
    mission.status = 'success';
`;

// executeQuery 함수 정의
function executeQuery(query, res) {
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(rows);
  });
}

// server setting - view, static, body-parser etc..
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router setting
app.use("/temp", tempRouter);

// missions 라우터
app.get("/missions", (req, res) => {
  const status = req.query.status;

  if (!status) {
    res.status(400).send("Bad Request: 'status' parameter is missing");
    return;
  }

  if (status === "in_progress") {
    executeQuery(inProgressQuery, res);
  } else if (status === "success") {
    executeQuery(successQuery, res);
  } else {
    res.status(400).send("Bad Request: Invalid status value");
  }
});

// error handling
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.data.status);
  console.log(err.data.message);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
