import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Outros')
@Controller({ version: '1' })
export class AppController {
  @IsPublic()
  @Get('alive')
  @ApiOperation({
    summary: 'Verificar API operante.',
  })
  getAlive(): { message: string } {
    return { message: '✅ API is running!' };
  }
}
