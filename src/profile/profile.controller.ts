import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileResponseOutput } from './output/profileResponse.output';
import { ProfileType } from './types/profile.type';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  @ApiOkResponse({ type: ProfileResponseOutput })
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileType> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      profileUsername,
    );
    return this.profileService.buildProfileResponse(profile);
  }

  @Post(':username/follow')
  @ApiOkResponse({ type: ProfileResponseOutput })
  @UseGuards(AuthGuard)
  async followProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileType> {
    const profile = await this.profileService.followProfile(
      currentUserId,
      profileUsername,
    );
    return this.profileService.buildProfileResponse(profile);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unfollowProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileType> {
    const profile = await this.profileService.unfollowProfile(
      currentUserId,
      profileUsername,
    );
    return this.profileService.buildProfileResponse(profile);
  }
}
