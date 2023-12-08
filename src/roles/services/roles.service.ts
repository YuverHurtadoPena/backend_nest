import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Rol } from '../entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoRol } from '../dto/dto-rol';

@Injectable()
export class RolesService {
  @InjectRepository(Rol)
  private rolRepo: Repository<Rol>;

  async create(body: DtoRol): Promise<Rol> {
    const existingRol = await this.rolRepo.findOne({
      where: { name: body.name },
    });

    if (existingRol) {
      throw new HttpException(
        'Ya existe un rol con ese nombre',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRol = this.rolRepo.create({
      name: body.name,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: null,
    });

    return this.rolRepo.save(newRol);
  }

  getAll() {
    return this.rolRepo.find();
  }

  async deleteRolOrRecuperar(id: number) {
    const rol = await this.rolRepo.findOne({ where: { id } });

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    if (rol.isDeleted) {
      rol.isDeleted = false;
    } else {
      rol.isDeleted = true;
    }
    rol.updatedAt = new Date();

    await this.rolRepo.save(rol);

    return rol;
  }

  async updateRol(body: DtoRol): Promise<Rol> {
    const id = body.id;
    const rol = await this.rolRepo.findOne({ where: { id } });

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    const existingRol = await this.rolRepo.findOne({
      where: { name: body.name },
    });
    if (existingRol && existingRol.id !== id) {
      throw new ConflictException(
        `Ya existe un rol con el nombre ${body.name}`,
      );
    }

    rol.name = body.name;
    rol.updatedAt = new Date();

    await this.rolRepo.save(rol);

    return rol;
  }

  async findRolById(id: number): Promise<Rol> {
    const rolById = await this.rolRepo.findOne({
      where: { id },
    });

    if (rolById) {
      return rolById;
    }
    throw new NotFoundException(`Rol con ID o nombre '${id}' no encontrado`);
  }
}
