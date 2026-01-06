import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { successResponse, createdResponse } from '../utils/response';

const eventService = new EventService();

export class EventController {
  async getAllEvents(req: Request, res: Response): Promise<void> {
    const events = await eventService.getAllEvents();
    successResponse(res, events);
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const event = await eventService.getEventById(id);
    successResponse(res, event);
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    const event = await eventService.createEvent(req.body);
    createdResponse(res, event, 'Event created successfully');
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const event = await eventService.updateEvent(id, req.body);
    successResponse(res, event, 'Event updated successfully');
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await eventService.deleteEvent(id);
    successResponse(res, null, 'Event deleted successfully');
  }
}
