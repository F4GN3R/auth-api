import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { LoggedUser } from 'src/decorators/logged-user.decorator';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get('profile')
  @ApiOperation({ summary: 'List logged user data' })
  findMe(@LoggedUser() id: string) {
    return this.userService.findMe(id);
  }

  @Get()
  @UserRole(Role.ADMIN)
  @ApiOperation({ summary: 'List all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update logged user data' })
  update(@LoggedUser() id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('profile')
  @ApiOperation({ summary: 'Remove logged user' })
  remove(@LoggedUser() id: string) {
    return this.userService.remove(id);
  }
}
