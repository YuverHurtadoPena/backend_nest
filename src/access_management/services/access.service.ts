import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AccessService {
  constructor(
    private readonly usersService: UsersService,
    private jwtS: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const userInfo = await this.usersService.findUserByEmail(loginDto.email);
    if (!userInfo) {
      throw new HttpException('email no encontrado', HttpStatus.NOT_FOUND);
    }
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      userInfo.password,
    );
    if (!isValidPassword) {
      throw new HttpException('error de credencial ', HttpStatus.NOT_FOUND);
    }

    const payload = { email: userInfo.email, id: userInfo.id };
    const token = this.jwtS.sign(payload);
    const dataInfo = {
      user: userInfo,
      token,
    };
    return dataInfo;
  }
}
