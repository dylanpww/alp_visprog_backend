export interface Review {
  id: number;
  eventId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReviewDto {
  eventId: number;
  userName: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  userName?: string;
  rating?: number;
  comment?: string;
}

export interface ReviewResponse {
  id: number;
  eventId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
