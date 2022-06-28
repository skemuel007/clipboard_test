import { Injectable } from '@nestjs/common';
import User from '../../user/entities/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
