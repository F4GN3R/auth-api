import { Controller, Get } from '@nestjs/common';

@Controller({ version: '1' })
export class AppController {
  @Get('alive')
  getAlive(): string {
    return 'API is running!';
  }
}
