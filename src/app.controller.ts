import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';

@Controller({ version: '1' })
export class AppController {
  @IsPublic()
  @Get('alive')
  getAlive(): { message: string } {
    return { message: '✅ API is running!' };
  }
}
