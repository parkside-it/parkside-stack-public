import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AccessTokenResponse,
  BackendPath,
  BadRequestErrorResponse,
  CreateUserDto,
  CreateUserParams,
  InternalServerErrorErrorResponse,
  LoginUserDto,
  UnauthorizedErrorResponse,
  User,
  VerificationParams,
} from '@parkside-stack/api-interfaces';
import { jwt, local } from './strategies';
import { UsersService } from './users.service';

@ApiTags(BackendPath.Users)
@Controller(BackendPath.Users)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post(BackendPath.Register)
  @ApiCreatedResponse({ type: User })
  @ApiQuery({ name: 'locale', enum: ['en', 'de'] })
  @ApiBadRequestResponse({ type: BadRequestErrorResponse })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorErrorResponse })
  async register(@Body() user: CreateUserDto, @Query() queryParams: CreateUserParams): Promise<User> {
    return new User(await this.userService.create(user, queryParams.locale));
  }

  @UseGuards(AuthGuard(local))
  @Post(BackendPath.Login)
  @HttpCode(200)
  @ApiOkResponse({ type: AccessTokenResponse })
  @ApiBody({ type: LoginUserDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponse })
  async login(@Request() req: any): Promise<AccessTokenResponse> {
    return this.userService.createAccessToken(req.user);
  }

  @Post(`${BackendPath.Verification}/:jwt`)
  @HttpCode(200)
  @ApiParam({ name: 'jwt', type: String })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ type: BadRequestErrorResponse })
  async verification(@Param() params: VerificationParams): Promise<User> {
    return new User(await this.userService.verification(params.jwt));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard(jwt))
  @Get('me')
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponse })
  @ApiOkResponse({ type: User })
  async me(@Request() req: any): Promise<User> {
    return new User(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard(jwt))
  @Delete('me')
  @HttpCode(204)
  @ApiNoContentResponse({})
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponse })
  async deleteMe(@Request() req: any): Promise<void> {
    this.userService.deleteById(req.user.id);
  }
}
