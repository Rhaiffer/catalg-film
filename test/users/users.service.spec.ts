import { Repository } from 'typeorm';
import { UserEntity } from '../../src/entity/users.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../src/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/controllers/users/dto/update-user.dto';
import { UsersService } from '../../src/services/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const repoMock = {
      find: jest.fn(),
      findOneOrFail: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      create: jest.fn().mockImplementation((data) => data),
      merge: jest
        .fn()
        .mockImplementation((user, data) => ({ ...user, ...data })),
      softDelete: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserEntityRepository', useValue: repoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get('UserEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    const result: UserEntity[] = [
      {
        id: '1',
        firstName: 'Carlos',
        lastName: 'Santos',
        email: 'carlos.santos@gmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: jest.fn(),
      },
    ];
    (repo.find as jest.Mock).mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });

  it('should get a user', async () => {
    const result: UserEntity = {
      id: '1',
      firstName: 'Carlos',
      lastName: 'Santos',
      email: 'carlos.santos@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      hashPassword: jest.fn(),
    };
    (repo.findOneOrFail as jest.Mock).mockResolvedValue(result);
    expect(await service.findOneOrFail({ where: { id: '1' } })).toBe(result);
  });

  it('should create a user', async () => {
    const dto = new CreateUserDto();
    const result: UserEntity = {
      id: '1',
      firstName: 'Carlos',
      lastName: 'Santos',
      email: 'carlos.santos@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      hashPassword: jest.fn(),
    };
    (repo.save as jest.Mock).mockResolvedValue(result);
    expect(await service.create(dto)).toBe(result);
  });

  it('should update a user', async () => {
    const dto = new UpdateUserDto();
    const result: UserEntity = {
      id: '1',
      firstName: 'Carlos',
      lastName: 'Santos',
      email: 'carlos.santos@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      hashPassword: jest.fn(),
    };
    (repo.findOneOrFail as jest.Mock).mockResolvedValue(result);
    (repo.save as jest.Mock).mockResolvedValue(result);
    expect(await service.update('1', dto)).toBe(result);
  });

  it('should delete a user', async () => {
    (repo.delete as jest.Mock).mockResolvedValue(undefined);
    expect(await service.remove('1')).toBeUndefined();
  });
});
