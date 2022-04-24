import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from './user.entity';
import { User } from './decorators/user.decorator';
import { BackendValidationPipe } from '../shared/pipes/backendValidation.pipe';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users/register')
  @UsePipes(new BackendValidationPipe())
  @ApiBody({
    type: CreateUserDto,
    description: `The object with 3 fields: username, email, password`,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  @ApiBody({
    type: LoginUserDto,
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('users/get-current')
  @UseGuards(AuthGuard)
  @ApiBody({
    type: UserEntity,
  })
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @ApiBody({
    type: UpdateUserDto,
  })
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
