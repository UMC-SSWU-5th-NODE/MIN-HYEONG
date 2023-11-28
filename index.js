import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/db.config.js";
import { response } from "./config/response.js";
import { tempRouter } from "./src/routes/temp.route.js";
import { reviewRouter } from "./src/routes/review.route.js";
import { storeRouter } from "./src/routes/store.route.js";
import { BaseError } from "./config/error.js";
import { status } from "./config/response.status.js";
import { swaggerSpec } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

// in_progress 데이터 추출 쿼리
const inProgressQuery = `
  SELECT * FROM mission
`;

// success 데이터 추출 쿼리
const successQuery = `
  SELECT * FROM mission
`;

// executeQuery 함수 정의
async function executeQuery(query, res) {
  try {
    const rows = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.send(rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal Server Error");
  }
}

// server setting - view, static, body-parser etc..
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router setting
app.use("/temp", tempRouter);

// missions 라우터
app.get("/missions", async (req, res) => {
  const status = req.query.status;

  if (!status) {
    res.status(400).send("Bad Request: 'status' parameter is missing");
    return;
  }

  let query;
  if (status === "in_progress") {
    query = inProgressQuery;
  } else if (status === "success") {
    query = successQuery;
  } else {
    res.status(400).send("Bad Request: Invalid status value");
    return;
  }

  // executeQuery 함수 호출
  await executeQuery(query, res);
});

// mission 라우터
app.use("/review", reviewRouter);
app.use("/store", storeRouter);
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
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
