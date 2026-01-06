export interface Event {
  id: number;
  name: string;
  location: string;
  description: string;
  photoUrl: string | null;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventDto {
  name: string;
  location: string;
  description: string;
  photoUrl?: string;
  rating?: number;
}

export interface UpdateEventDto {
  name?: string;
  location?: string;
  description?: string;
  photoUrl?: string;
  rating?: number;
}

export interface EventResponse {
  id: number;
  name: string;
  location: string;
  description: string;
  photoUrl: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
