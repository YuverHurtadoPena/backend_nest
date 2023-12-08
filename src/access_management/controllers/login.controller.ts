import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login-dto';
import { AccessService } from '../services/access.service';

@Controller('api/login')
export class LoginController {
  constructor(private accessService: AccessService) {}
  @Post()
  login(@Body() body: LoginDto) {
    return this.accessService.login(body);
  }
}
