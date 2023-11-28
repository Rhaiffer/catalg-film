import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/users.entity';

// Criação de um mock para JwtService
const mockJwtService = {
  sign: jest.fn(() => 'token'),
};

// Criação de um mock para UserEntityRepository
const mockUserEntityRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        // Fornecendo os mocks para JwtService e UserEntityRepository
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserEntityRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
