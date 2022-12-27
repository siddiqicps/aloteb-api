import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entity/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt'
import { JwtConfigService } from 'src/common_services/jwt-config-service';
import { Role } from 'src/entity/Role';

@Module({
  imports: [
      TypeOrmModule.forFeature([User, Role])
      , JwtModule.register({
          secret: 'cvbcvbw3ry9rhdncd230ejedpsd-2e0-32d-2d',
          signOptions: { expiresIn: '60s' },
        })
],
  controllers: [UsersController],
  providers: [UsersService, JwtService, JwtConfigService]
})
export class UsersModule {}
