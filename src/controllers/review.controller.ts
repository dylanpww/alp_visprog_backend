import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { successResponse, createdResponse } from '../utils/response';

const reviewService = new ReviewService();

export class ReviewController {
  async getAllReviews(req: Request, res: Response): Promise<void> {
    const reviews = await reviewService.getAllReviews();
    successResponse(res, reviews);
  }

  async getReviewById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const review = await reviewService.getReviewById(id);
    successResponse(res, review);
  }

  async getReviewsByEventId(req: Request, res: Response): Promise<void> {
    const eventId = parseInt(req.params.eventId);
    const reviews = await reviewService.getReviewsByEventId(eventId);
    successResponse(res, reviews);
  }

  async createReview(req: Request, res: Response): Promise<void> {
    const review = await reviewService.createReview(req.body);
    createdResponse(res, review, 'Review created successfully');
  }

  async updateReview(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const review = await reviewService.updateReview(id, req.body);
    successResponse(res, review, 'Review updated successfully');
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await reviewService.deleteReview(id);
    successResponse(res, null, 'Review deleted successfully');
  }
}
