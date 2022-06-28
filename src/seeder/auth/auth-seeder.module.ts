import { Logger, Module } from '@nestjs/common';
import { AuthSeederService } from './auth-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../user/entities/user.entity';

@Module({
  providers: [AuthSeederService, Logger],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [AuthSeederService],
})
export class AuthSeederModule {}
