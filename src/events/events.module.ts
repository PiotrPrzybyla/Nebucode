import { Module } from '@nestjs/common';
import { EventsControler } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventEntity from './EventEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventsControler],
  providers: [EventsService],
})
export class EventsModule {}
