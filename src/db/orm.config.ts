import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import UserEntity from 'src/auth/user.entity';
import EventEntity from 'src/events/event.entity';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [EventEntity, UserEntity],
};
