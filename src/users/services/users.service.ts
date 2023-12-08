import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { UserDtoRequest } from '../dto/user-dto-request';
import { Rol } from 'src/roles/entities/rol.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private userRepo: Repository<Users>;
  @InjectRepository(Rol)
  private readonly rolRepo: Repository<Rol>;

  async create(body: UserDtoRequest): Promise<Users> {
    const existingUser = await this.userRepo.findOne({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new HttpException('Ya existe el usuario', HttpStatus.BAD_REQUEST);
    }
    const id = body.rolId;
    const existingRol = await this.rolRepo.findOne({
      where: { id, isDeleted: false },
    });

    if (!existingRol) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    const encryptPassword = await bcrypt.hash(body.password, 10);
    const newUser = this.userRepo.create({
      fullName: body.fullName,
      email: body.email,
      password: encryptPassword,
      phone: body.phone,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: null,
      rol: existingRol,
    });

    return this.userRepo.save(newUser);
  }

  async updateUser(updateUserDto: UserDtoRequest): Promise<Users> {
    const user = await this.userRepo.findOne({
      where: { email: updateUserDto.email },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con email: ${updateUserDto.email} no encontrado`,
      );
    }
    const id = updateUserDto.rolId;
    const existingRol = await this.rolRepo.findOne({
      where: { id, isDeleted: false },
    });

    if (!existingRol) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.fullName) {
      user.fullName = updateUserDto.fullName;
    }

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.phone) {
      user.phone = updateUserDto.phone;
    }

    if (updateUserDto.rolId) {
      user.id = updateUserDto.rolId;
    }

    await this.userRepo.save(user);

    return user;
  }

  async deleteUserByEmailOrRecovery(email: string): Promise<Users> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(
        `Usuario con correo electrónico ${email} no encontrado`,
      );
    }

    if (user.isDeleted) {
      user.isDeleted = false;
    } else {
      user.isDeleted = true;
    }

    await this.userRepo.save(user);

    return user;
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.userRepo.findOne({
      where: { email, isDeleted: false },
      relations: ['rol'],
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con correo electrónico ${email} no encontrado`,
      );
    }

    return user;
  }
}
