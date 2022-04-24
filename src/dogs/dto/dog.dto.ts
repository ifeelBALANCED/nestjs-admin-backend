import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DogDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly breed?: string;
}
