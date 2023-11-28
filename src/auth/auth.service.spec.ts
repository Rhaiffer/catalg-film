import { Test, TestingModule } from '@nestjs/testing';
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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
