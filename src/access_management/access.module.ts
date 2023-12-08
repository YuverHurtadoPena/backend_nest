import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { AccessService } from './services/access.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './util/constants';
import { JwtStrategy } from './util/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [LoginController],
  providers: [AccessService, JwtStrategy],
})
export class AccessModule {}
