import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/controllers/users/users.controller';
import { UsersService } from '../../src/services/users.service';
import { CreateUserDto } from '../../src/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/controllers/users/dto/update-user.dto';
import { UserEntity } from '../../src/entity/users.entity';
import { AuthGuard } from '@nestjs/passport';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOneOrFail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AuthGuard('jwt'),
          useValue: { canActivate: jest.fn(() => true) },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
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
    jest.spyOn(service, 'findOneOrFail').mockResolvedValue(result);
    expect(await controller.show('1')).toBe(result);
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
    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await controller.create(dto)).toBe(result);
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
    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await controller.update('1', dto)).toBe(result);
  });
  it('should delete a user', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    expect(await controller.destroy('1')).toBeUndefined();
  });
});
