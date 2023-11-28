class ReviewDTO {
  constructor(member_id, store_id, score, body) {
    this.member_id = member_id;
    this.store_id = store_id;
    this.score = score;
    this.body = body;
  }
}

export { ReviewDTO };
