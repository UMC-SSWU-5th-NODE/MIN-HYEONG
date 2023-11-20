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

// server setting - veiw, static, body-parser etc..
app.set("port", process.env.PORT || 3000); // 서버 포트 지정
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({ extended: false }));

// router setting
app.use("/temp", tempRouter);

app.get("/missions", (req, res) => {
  connection.query("SELECT * FROM mission", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
  console.log("missions");
});

// error handling
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.data.status);
  console.log(err.data.message);
  // 템플릿 엔진 변수 설정
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(
    process.env.HOST,
    process.env.USERNAME,
    process.env.PASSWORD,
    process.env.DATABASE
  );
});
