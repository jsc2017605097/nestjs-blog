import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { MailService } from "./mail.service";

@Processor('mail-queue')
export class MailConsumer {
    constructor(private mailService: MailService) { }
    @Process('mail-job')
    readOperationJob(job: Job<unknown>) {
        const username = job.data['user']
        this.mailService.sendUserConfirmation(username)
    }
}