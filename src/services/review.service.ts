import prisma from "../utils/prisma-client";
import {
  CreateReviewDto,
  UpdateReviewDto,
  ReviewResponse,
} from "../models/review.model";
import { NotFoundError, BadRequestError } from "../errors/app-error";

export class ReviewService {
  async getAllReviews(): Promise<ReviewResponse[]> {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews.map((review) => this.toReviewResponse(review));
  }

  async getReviewById(id: number): Promise<ReviewResponse> {
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundError(`Review with ID ${id} not found`);
    }

    return this.toReviewResponse(review);
  }

  async getReviewsByEventId(eventId: number): Promise<ReviewResponse[]> {
    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundError(`Event with ID ${eventId} not found`);
    }

    const reviews = await prisma.review.findMany({
      where: { eventId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews.map((review) => this.toReviewResponse(review));
  }

  async createReview(data: CreateReviewDto): Promise<ReviewResponse> {
    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      throw new BadRequestError(`Event with ID ${data.eventId} not found`);
    }

    const review = await prisma.review.create({
      data: {
        eventId: data.eventId,
        userName: data.userName,
        rating: data.rating,
        comment: data.comment,
      },
    });

    // Update event rating (calculate average)
    await this.updateEventRating(data.eventId);

    return this.toReviewResponse(review);
  }

  async updateReview(
    id: number,
    data: UpdateReviewDto
  ): Promise<ReviewResponse> {
    // Check if review exists
    const existingReview = await this.getReviewById(id);

    const review = await prisma.review.update({
      where: { id },
      data: {
        ...(data.userName && { userName: data.userName }),
        ...(data.rating !== undefined && { rating: data.rating }),
        ...(data.comment && { comment: data.comment }),
      },
    });

    // Update event rating if rating changed
    if (data.rating !== undefined) {
      await this.updateEventRating(review.eventId);
    }

    return this.toReviewResponse(review);
  }

  async deleteReview(id: number): Promise<void> {
    // Check if review exists
    const review = await this.getReviewById(id);

    await prisma.review.delete({
      where: { id },
    });

    // Update event rating after deletion
    await this.updateEventRating(review.eventId);
  }

  private async updateEventRating(eventId: number): Promise<void> {
    const reviews = await prisma.review.findMany({
      where: { eventId },
    });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    await prisma.event.update({
      where: { id: eventId },
      data: { rating: averageRating },
    });
  }

  private toReviewResponse(review: any): ReviewResponse {
    return {
      id: review.id,
      eventId: review.eventId,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
    };
  }
}
