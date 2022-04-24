import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  async findAll(): Promise<string[]> {
    const tags = await this.tagService.findAll();
    return tags.map((tag) => tag.name);
  }
}
