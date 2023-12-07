import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Rol } from 'src/roles/entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, UsersController])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
