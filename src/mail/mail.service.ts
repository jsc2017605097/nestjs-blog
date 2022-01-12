import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/interface/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App!',
      template: '<b>Welcome</b>', // `.hbs` extension is appended automatically
    });
  }
}
