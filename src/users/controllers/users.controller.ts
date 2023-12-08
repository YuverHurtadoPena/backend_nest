import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDtoRequest } from '../dto/user-dto-request';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/access_management/util/JwtAuthGuard';

@Controller('api/user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  createUser(@Body() body: UserDtoRequest) {
    return this.usersService.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  updateRol(@Body() body: UserDtoRequest) {
    return this.usersService.updateUser(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':email')
  deleteUserByEmail(@Param('email') email: string) {
    return this.usersService.deleteUserByEmailOrRecovery(email);
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }
}
