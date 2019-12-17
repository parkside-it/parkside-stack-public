import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, CryptoModule, TokenModule } from '@psb-shared';
import { PayloadModule, PayloadService } from './payload';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule, TokenModule, CryptoModule, PayloadModule],
  providers: [UsersService, LocalStrategy, JwtStrategy, PayloadService],
  controllers: [UsersController],
  exports: [JwtStrategy],
})
export class UsersModule {}
