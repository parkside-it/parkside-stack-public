import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiImplicitBody,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  AccessToken,
  BackendPath,
  CreateUserDto,
  CreateUserParams,
  LoginUserDto,
  Response,
  User,
  VerificationParams,
} from '@parkside-stack/api-interfaces';
import { ErrorMessage } from '@psb-shared';
import { jwt, local } from './strategies';
import { UsersService } from './users.service';

@ApiUseTags(BackendPath.Users)
@Controller(BackendPath.Users)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post(BackendPath.Register)
  @ApiCreatedResponse({ type: User })
  async register(@Body() user: CreateUserDto, @Query() queryParams: CreateUserParams): Promise<User> {
    return this.userService.create(user, queryParams.locale);
  }

  @UseGuards(AuthGuard(local))
  @Post(BackendPath.Login)
  @HttpCode(200)
  @ApiImplicitBody({ name: LoginUserDto.name, type: LoginUserDto })
  @ApiForbiddenResponse({ description: ErrorMessage.UNAUTHORIZED })
  @ApiOkResponse({ type: AccessToken })
  async login(@Request() req: any): Promise<AccessToken> {
    return this.userService.createAccessToken(req.user);
  }

  @ApiOkResponse({ type: User })
  @Post(`${BackendPath.Verification}/:jwt`)
  async verification(@Param() params: VerificationParams): Promise<User> {
    return await this.userService.verification(params.jwt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard(jwt))
  @Get('me')
  @ApiForbiddenResponse({ description: ErrorMessage.UNAUTHORIZED })
  @ApiOkResponse({ type: User })
  async me(@Request() req: any): Promise<User> {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard(jwt))
  @Delete('me')
  @ApiForbiddenResponse({ description: ErrorMessage.UNAUTHORIZED })
  @ApiOkResponse({ type: Response })
  async deleteMe(@Request() req: any): Promise<Response> {
    return this.userService.deleteById(req.user.id);
  }
}
