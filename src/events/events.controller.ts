import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get()
  getEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get('/:id')
  getEvent(@Param('id') id: string) {
    return this.eventsService.getByID(parseInt(id));
  }

  @Post()
  addEvent(@Body() body: CreateEventDto) {
    return this.eventsService.add(body.name, body.start, body.end);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeEvent(@Param('id') id: string) {
    return this.eventsService.remove(parseInt(id));
  }
  @Patch('/:id')
  updateEvent(@Param('id') id: string, @Body() body) {
    return this.eventsService.update(
      parseInt(id),
      body.name,
      body.start,
      body.end,
    );
  }
}
