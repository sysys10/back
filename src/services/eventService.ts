import { AppDataSource } from '../config/typeorm.config.js';
import { Event } from '../entities/Event.js';
import { User } from '../entities/User.js';

export const createEvent = async (userId: string, eventData: Partial<Event>) => {
  const eventRepository = AppDataSource.getRepository(Event);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  const newEvent = eventRepository.create({
    ...eventData,
    user: user
  });

  return await eventRepository.save(newEvent);
};

export const updateEvent = async (eventId: string, userId: string, eventData: Partial<Event>) => {
  const eventRepository = AppDataSource.getRepository(Event);
  const event = await eventRepository.findOne({ where: { id: eventId, user: { id: userId } } });

  if (!event) {
    throw new Error('Event not found or you do not have permission to update it');
  }

  Object.assign(event, eventData);
  return await eventRepository.save(event);
};

export const deleteEvent = async (eventId: string, userId: string) => {
  const eventRepository = AppDataSource.getRepository(Event);
  const event = await eventRepository.findOne({ where: { id: eventId, user: { id: userId } } });

  if (!event) {
    throw new Error('Event not found or you do not have permission to delete it');
  }

  await eventRepository.remove(event);
};

export const getEvents = async (userId: string) => {
  const eventRepository = AppDataSource.getRepository(Event);
  
  return await eventRepository.find({ where: { user: { id: userId } } });
};