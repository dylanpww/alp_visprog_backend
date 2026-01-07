import prisma from '../utils/prisma-client';
import { CreateEventDto, UpdateEventDto, EventResponse } from '../models/event.model';
import { NotFoundError } from '../errors/app-error';

export class EventService {
  async getAllEvents(): Promise<EventResponse[]> {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return events.map(event => this.toEventResponse(event));
  }

  async getEventById(id: number): Promise<EventResponse> {
    const event = await prisma.event.findUnique({
      where: { id }
    });

    if (!event) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }

    return this.toEventResponse(event);
  }

  async createEvent(data: CreateEventDto): Promise<EventResponse> {
    const event = await prisma.event.create({
      data: {
        name: data.name,
        location: data.location,
        description: data.description,
        photoUrl: data.photoUrl || null,
        rating: data.rating || 0
      }
    });

    return this.toEventResponse(event);
  }

  async updateEvent(id: number, data: UpdateEventDto): Promise<EventResponse> {
    // Check if event exists
    await this.getEventById(id);

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.location && { location: data.location }),
        ...(data.description && { description: data.description }),
        ...(data.photoUrl !== undefined && { photoUrl: data.photoUrl }),
        ...(data.rating !== undefined && { rating: data.rating })
      }
    });

    return this.toEventResponse(event);
  }

  async deleteEvent(id: number): Promise<void> {
    // Check if event exists
    await this.getEventById(id);

    await prisma.event.delete({
      where: { id }
    });
  }

  private toEventResponse(event: any): EventResponse {
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      description: event.description,
      photoUrl: event.photoUrl,
      rating: event.rating,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString()
    };
  }
}
