import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { DtoRol } from '../dto/dto-rol';

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
  @Put()
  updateRol(@Body() body: DtoRol) {
    return this.rolService.updateRol(body);
  }
  @Delete(':id')
  deleteRol(@Param('id') id: number) {
    return this.rolService.deleteRol(id);
  }
  @Get('by-id/:id')
  getById(@Param('id') id: number) {
    return this.rolService.findRolById(id);
  }
}
