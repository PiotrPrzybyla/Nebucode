import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import EventEntity from 'src/events/EventEntity.entity';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [EventEntity],
};
