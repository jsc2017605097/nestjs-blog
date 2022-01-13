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

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }]),
    MailModule
  ],
  controllers: [UserController],
  providers: [UserService]
}) export class UserModule { }