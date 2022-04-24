import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly body: string;

  @ApiProperty({ required: false })
  readonly tagList?: string[];
}
