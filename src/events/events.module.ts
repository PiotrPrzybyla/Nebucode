import { Module } from '@nestjs/common';
import { EventsControler } from './events.controller';
import { EventsService } from './events.service';

@Module({ controllers: [EventsControler], providers: [EventsService] })
export class EventsModule {}
