import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(@InjectQueue('mail-queue') private queue: Queue, private mailerService: MailerService) { }
    async sendMail(username: string) {
        await this.queue.add('mail-job', {
            user: username
        });
    }

    async sendUserConfirmation(user: string) {
        await this.mailerService.sendMail({
            to: user,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: '../templates/confirmation.hbs', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                user: user,
            },
        });
    }
}
