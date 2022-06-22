import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public start: string;

  @Column()
  public end: string;
}
export default EventEntity;
