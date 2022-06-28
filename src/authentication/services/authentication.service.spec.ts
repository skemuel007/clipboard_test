import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import RegisterDto from '../dto/register.dto';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

class AuthenticationServiceMock {
  register(registrationData: any) {
    return null;
  }

  getAuthenticatedUser(email: string, plainTextPassword: string) {
    return null;
  }

  getCookieWithJwtToken(userId: number) {
    return null;
  }

  getCookieForLogOut() {
    return null;
  }
}

describe.only('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeAll(async () => {
    const AuthenticationServiceProvider = {
      provide: AuthenticationService,
      useClass: AuthenticationServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, AuthenticationServiceProvider],
    }).compile();
    authService = module.get<AuthenticationService>(AuthenticationService);
  });
  it('it should call registerNote method with expected param', async () => {
    const registerUserSpy = jest.spyOn(authService, 'register');
    const dto = new RegisterDto();
    await authService.register(dto);
    expect(registerUserSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getAuthenticatedUser with expected params', async () => {
    const getAuthenticatedUserSpy = jest.spyOn(
      authService,
      'getAuthenticatedUser',
    );
    const email = 'email';
    const plainTextPassword = 'plainTextPassword';
    await authService.getAuthenticatedUser(email, plainTextPassword);
    expect(getAuthenticatedUserSpy).toHaveBeenCalledWith(
      email,
      plainTextPassword,
    );
  });

  it('should call getCookieWithJwtToken with expected param', async () => {
    const getCookieWithJwtTokenSpy = jest.spyOn(
      authService,
      'getCookieWithJwtToken',
    );
    const userId = 1;
    authService.getCookieWithJwtToken(userId);
    expect(getCookieWithJwtTokenSpy).toHaveBeenCalledWith(userId);
  });
});
