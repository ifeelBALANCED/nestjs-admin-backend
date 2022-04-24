import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DogDto } from './dto/dog.dto';
import { DogEntity } from './entities/dogs.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(DogEntity)
    private readonly dogRepository: Repository<DogEntity>,
  ) {}

  createDog = async (dogDto: DogDto) => {
    const dogByName = await this.dogRepository.findOne({ name: dogDto.name });

    if (dogByName) {
      throw new HttpException(
        'Dog with this name already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.dogRepository.save(dogDto);
  };

  findAll = async () => {
    return await this.dogRepository.find();
  };

  findOneDog = async (id: string) => {
    const dog = await this.dogRepository.findOne(id);
    if (!dog) {
      throw new HttpException('Dog does not exist', HttpStatus.NOT_FOUND);
    }
    return await this.dogRepository.findOneOrFail(id);
  };

  updateDog = async (id: string, dogDto: DogDto) => {
    const dog = await this.dogRepository.findOne(id);
    Object.assign(dog, dogDto);
    return await this.dogRepository.save(dog);
  };

  removeDog = async (id: string) => {
    const dogId = await this.findOneDog(id);
    return this.dogRepository.delete(dogId);
  };
}
