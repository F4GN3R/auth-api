import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { LoggedUser } from 'src/decorators/logged-user.decorator';
import { IsPublic } from 'src/decorators/is-public.decorator';

@ApiTags('Usuários')
@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário.' })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar dados do usuário cadastrado.',
    description: 'Essa operação só pode ser feita pelo usuário logado.',
  })
  findMe(@LoggedUser() id: string) {
    return this.userService.findMe(id);
  }

  @Get('list-all')
  @UserRole(Role.ADMIN)
  @ApiOperation({
    summary: 'Listar dados de todos os usuários cadastrados.',
    description:
      'Essa operação só pode ser feita pelo usuário logado do tipo ADMIN.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Patch()
  @ApiOperation({
    summary: 'Atualizar dados do usuário.',
    description: 'Essa operação só pode ser feita pelo usuário logado.',
  })
  update(@LoggedUser() id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete()
  @ApiOperation({
    summary: 'Remover usuário cadastrado.',
    description: 'Essa operação só pode ser feita pelo usuário logado.',
  })
  remove(@LoggedUser() id: string) {
    return this.userService.remove(id);
  }
}
