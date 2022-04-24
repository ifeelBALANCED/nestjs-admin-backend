import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'dog' })
export class DogEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 50 })
  name: string;

  @ApiProperty()
  @Column()
  age: number;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  breed: string;
}
