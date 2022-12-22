import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/User';
import { UsersModule } from './users/users.module';
import { AuthService } from './common_services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizeMiddleware } from './middlewares/authorize/authorize.middleware';
import { JwtService } from '@nestjs/jwt';
import { RequestMethod } from '@nestjs/common/enums';
import { JwtConfigService } from './common_services/jwt-config-service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "aloteb-test",
      logging: true,
      synchronize: false,
      entities: [
          User
      ],
      subscribers: [
          "subscriber/*.js"
      ],
      migrations: [
          "migration/*.js"
      ],
  }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, JwtConfigService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((AuthorizeMiddleware))
      .exclude( {path: 'users/login', method: RequestMethod.POST} )
      .forRoutes('users');
  }
}
