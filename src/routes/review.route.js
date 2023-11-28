import express from "express";
import { ReviewController } from "../controllers/ReviewController.js";

const router = express.Router();
const reviewController = new ReviewController();

// 가게에 리뷰 추가 API
router.post("/add", reviewController.addReview);

export { router as reviewRouter };
