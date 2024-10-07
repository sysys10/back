import { Request, Response } from 'express';
import * as EventService from '../services/eventService.js';

export const createEventHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const eventData = req.body;
    const event = await EventService.createEvent(userId, eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error: error });
  }
};

export const updateEventHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    const eventData = req.body;
    const event = await EventService.updateEvent(eventId, userId, eventData);
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update event', error: error });
  }
};

export const deleteEventHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    await EventService.deleteEvent(eventId, userId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete event', error: error });
  }
};

export const getEventsHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await EventService.getEvents(userId);
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get events', error: error });
  }
};