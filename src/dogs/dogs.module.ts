import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogService } from './dogs.service';
import { DogEntity } from './entities/dogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogsController],
  providers: [DogService],
})
export class DogsModule {}
