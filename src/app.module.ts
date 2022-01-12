import {
  Module
} from '@nestjs/common';
import {
  AppController
} from './app.controller';
import {
  AppService
} from './app.service';
import {
  MongooseModule
} from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest-blog'), BlogModule, UserModule, MailModule,],
  controllers: [AppController],
  providers: [AppService],
}) export class AppModule { }
// demo test-branch
// demo test2-branch
