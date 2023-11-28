import { ReviewService } from "../services/ReviewService.js";
import { ReviewDTO } from "../dtos/ReviewDTO.js";

const reviewService = new ReviewService();

class ReviewController {
  async addReview(req, res) {
    try {
      const { member_id, store_id, score, body } = req.body;
      const reviewDTO = new ReviewDTO(member_id, store_id, score, body);
      const newReview = await reviewService.addReview(reviewDTO);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { ReviewController };
