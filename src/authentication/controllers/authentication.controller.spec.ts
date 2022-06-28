import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../services/authentication.service';
import RegisterDto from '../dto/register.dto';
import { Req } from '@nestjs/common';

describe('AuthenticationController Unit Tests', () => {
  let authenticationController: AuthenticationController;
  let authenticationServiceSpy: AuthenticationService;

  beforeAll(async () => {
    const AuthenticationServiceProvider = {
      provide: AuthenticationService,
      useFactory: () => ({
        register: jest.fn(() => []),
        logIn: jest.fn(() => []),
        logOut: jest.fn(() => []),
        authenticate: jest.fn(() => []),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService, AuthenticationServiceProvider],
    }).compile();

    authenticationController = app.get<AuthenticationController>(
      AuthenticationController,
    );
    authenticationServiceSpy = app.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  it('calling register method', () => {
    const dto = new RegisterDto();
    expect(authenticationController.register(dto)).not.toEqual(null);
  });
});
