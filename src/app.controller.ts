import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('alive')
  getAlive(): string {
    return 'API is running!';
  }
}
