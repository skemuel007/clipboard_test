import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../user/user.entity';
import { Repository } from 'typeorm';
import { authUsers } from './auth_data';
import * as bcrypt from 'bcrypt';

/**
 * Service for seeding user
 */
@Injectable()
export class AuthSeederService {
  /**
   * Constructor of AuthSeeder service
   * @param userRepository
   */
  constructor(
    private log: Logger,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Seeds first time user
   */
  create(): Array<Promise<User>> {
    return authUsers.map(async (authUser: User) => {
      return await this.userRepository
        .findOne({
          where: {
            email: authUser.email,
          },
        })
        .then(async (dbUser: User | null) => {
          this.log.debug('User: ' + dbUser);
          if (dbUser) return Promise.resolve(null);

          this.log.debug('Test pw: ' + authUser.password);
          authUser.password = await bcrypt.hash(authUser.password, 10);
          return Promise.resolve(await this.userRepository.save(authUser));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
