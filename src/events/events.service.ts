import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EventEntity from './EventEntity.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}
  getAllEvents() {
    return this.eventRepository.find();
  }
  async getByID(id: number) {
    const event = await this.eventRepository.findOneBy({ id: id });
    if (event) return event;
    throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
  }
  add(name: string, start: string, end: string) {
    const newEvent = this.eventRepository.create({ name, start, end });
    return this.eventRepository.save(newEvent);
  }
  remove(id: number) {
    this.eventRepository.delete({ id: id });
  }
  async update(id: number, name: string, start: string, end: string) {
    await this.eventRepository.update(id, {
      name: name,
      start: start,
      end: end,
    });
    const updatedEvent = await this.eventRepository.findOneBy({ id: id });
    if (updatedEvent) return updatedEvent;
    throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
  }
}
