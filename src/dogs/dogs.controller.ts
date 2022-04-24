import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DogDto } from './dto/dog.dto';
import { DogService } from './dogs.service';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../user/guards/auth.guard';
import { DogEntity } from './entities/dogs.entity';

@ApiTags('Dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogService: DogService) {}

  @Post('dog/create')
  @UseGuards(AuthGuard)
  @ApiBody({
    type: DogDto,
  })
  async create(@Body() dogDto: DogDto) {
    return await this.dogService.createDog(dogDto);
  }

  @Get('/list')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: DogEntity })
  findAll() {
    return this.dogService.findAll();
  }

  @Get('dog/:id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiOkResponse({ type: DogEntity })
  findOne(@Param('id') id: string) {
    return this.dogService.findOneDog(id);
  }

  @Put('dog/:id/update')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiBody({
    type: DogDto,
    description: 'Object with 3 keys: name, age, breed',
  })
  @ApiOkResponse({ type: DogEntity })
  async update(@Param('id') id: string, @Body() dogDto: DogDto) {
    return await this.dogService.updateDog(id, dogDto);
  }

  @Delete('dog/:id/delete')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async remove(@Param('id') id: string) {
    return await this.dogService.removeDog(id);
  }
}
