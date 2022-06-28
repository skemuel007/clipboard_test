import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import User from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('The UserService', () => {
  let userService: UserService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne,
          },
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const userDetail = await userService.getByEmail('test@test.com');
        expect(userDetail).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(userService.getByEmail('test@test.com')).rejects.toThrow();
      });
    });
  });
});
