import { Injectable } from '@nestjs/common';

let events = [
  { id: 1, name: 'event1', start: '01.01.2023', end: '02.02.2023' },
  { id: 2, name: 'event2', start: '08.11.2022', end: '12.01.2023' },
];
@Injectable()
export class EventsService {
  getAllEvents() {
    return events;
  }
  getByID(id: number) {
    return events.find((e) => e.id === id);
  }
  add(name: string, start: string, end: string) {
    const id = Math.floor(Math.random() * 10000);
    const newEvent = { id, name, start, end };
    events.push(newEvent);
    return newEvent;
  }
  remove(id: number) {
    events = events.filter((e) => e.id !== id);
  }
  update(id: number, name: string, start: string, end: string) {
    const event = events.find((e) => e.id === id);
    event.name = name;
    event.start = start;
    event.end = end;
    return event;
  }
}
