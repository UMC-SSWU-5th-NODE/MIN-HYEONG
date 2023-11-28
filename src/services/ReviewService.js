import { Review } from "../models/Review.js";

class ReviewService {
  async addReview(reviewDTO) {
    try {
      const review = await Review.create(reviewDTO);
      return review;
    } catch (error) {
      throw new Error("Failed to add review.");
    }
  }
}

export { ReviewService };
