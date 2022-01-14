import {
  Module
} from '@nestjs/common';
import {
  UserController
} from './user.controller';
import {
  UserService
} from './user.service';
import {
  MongooseModule
} from '@nestjs/mongoose';
import {
  UserSchema
} from './schemas/user.schemas';
import {
  MailModule
} from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt-auth.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
    }]),
    MailModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1 hour' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy,JwtStrategy]
}) export class UserModule { }