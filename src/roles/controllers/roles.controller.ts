import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { DtoRol } from '../dto/dto-rol';
import { JwtAuthGuard } from 'src/access_management/util/JwtAuthGuard';

@Controller('api/roles')
export class RolesController {
  constructor(private rolService: RolesService) {}
  @Get()
  getAll() {
    return this.rolService.getAll();
  }

  @Post()
  createRol(@Body() body: DtoRol) {
    return this.rolService.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  updateRol(@Body() body: DtoRol) {
    return this.rolService.updateRol(body);
  }
  @Put(':id')
  deleteRol(@Param('id') id: number) {
    return this.rolService.deleteRolOrRecuperar(id);
  }

  @Get('by-id/:id')
  getById(@Param('id') id: number) {
    return this.rolService.findRolById(id);
  }
}
