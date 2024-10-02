import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { MailerSend, Recipient, Sender, EmailParams } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

@Injectable()
export class MailerSendService {
  async mailResetPassword(user: User, hash: string): Promise<void> {
    const sentFrom = new Sender(
      `test@${process.env.MAILERSEND_DOMAIN}`,
      'Auth API',
    );

    const recipients = [new Recipient(user.email, user.name)];
    const personalization = [
      {
        email: user.email,
        data: {
          name: user.name,
          url_hash: `${process.env.RESET_PASSWORD_URL}/${hash}`,
        },
      },
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject('Redefinição de senha')
      .setTemplateId(process.env.MAILERSEND_TEMPLATE_ID)
      .setPersonalization(personalization);

    await mailerSend.email.send(emailParams);
  }
}
