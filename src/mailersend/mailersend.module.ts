import { Module } from '@nestjs/common';
import { MailerSendService } from './mailersend.service';

@Module({
  providers: [MailerSendService],
  exports: [MailerSendService],
})
export class MailerSendModule {}
