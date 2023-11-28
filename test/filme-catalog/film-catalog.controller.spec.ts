import { Test, TestingModule } from '@nestjs/testing';
import { FilmCatalogController } from '../../src/controllers/film-catalog/film-catalog.controller';
import { FilmCatalogService } from '../../src/services/film-catalog.service';
import { CreateFilmDto } from '../../src/controllers/film-catalog/dto/create-film.dto';
import { UpdateFilmDto } from '../../src/controllers/film-catalog/dto/update-film.dto';
import { Redis } from 'ioredis';
import { FilmCatalogEntity } from '../../src/entity/film-catalog.entity';

describe('FilmCatalogController', () => {
  let controller: FilmCatalogController;
  let service: FilmCatalogService;
  let redis: Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmCatalogController],
      providers: [
        {
          provide: FilmCatalogService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: 'Redis',
          useValue: {
            get: jest.fn(),
            setex: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmCatalogController>(FilmCatalogController);
    service = module.get<FilmCatalogService>(FilmCatalogService);
    redis = module.get<Redis>('Redis');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Teste para o método findAll
  it('should get all films', async () => {
    const result = { data: [], source: 'database' };
    jest.spyOn(redis, 'get').mockImplementation(() => null);
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve([]));
    expect(await controller.findAll()).toEqual(result);
  });

  it('should create a film', async () => {
    const result: FilmCatalogEntity = {
      id: '1',
      name: 'O Poderoso Chefão',
      year: 1972,
      genre: 'Crime, Drama',
      director: 'Francis Ford Coppola',
      duration: 120,
      synopsis: 'Um chefão da máfia tenta transferir o poder para o filho.',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteDate: null,
    };
    const dto = new CreateFilmDto();
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(result));
    expect(await controller.create(dto)).toEqual(result);
  });

  // Teste para o método update
  it('should update a film', async () => {
    const result: FilmCatalogEntity = {
      id: '1',
      name: 'O Poderoso Chefão',
      year: 1972,
      genre: 'Crime, Drama',
      director: 'Francis Ford Coppola',
      duration: 120,
      synopsis: 'Um chefão da máfia tenta transferir o poder para o filho.',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteDate: null,
    };
    const dto = new UpdateFilmDto();
    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(result));
    expect(await controller.update('1', dto)).toEqual(result);
  });
});
