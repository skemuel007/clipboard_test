import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UserModule]
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
