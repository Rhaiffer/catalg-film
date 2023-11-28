import { Repository } from 'typeorm';
import { FilmCatalogEntity } from '../../src/entity/film-catalog.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateFilmDto } from '../../src/controllers/film-catalog/dto/create-film.dto';
import { UpdateFilmDto } from '../../src/controllers/film-catalog/dto/update-film.dto';
import { FilmCatalogService } from '../../src/services/film-catalog.service';

describe('FilmCatalogService', () => {
  let service: FilmCatalogService;
  let repo: Repository<FilmCatalogEntity>;

  beforeEach(async () => {
    const repoMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      create: jest.fn().mockImplementation((data) => data),
      merge: jest
        .fn()
        .mockImplementation((film, data) => ({ ...film, ...data })),
      softDelete: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmCatalogService,
        { provide: 'FilmCatalogEntityRepository', useValue: repoMock },
      ],
    }).compile();

    service = module.get<FilmCatalogService>(FilmCatalogService);
    repo = module.get('FilmCatalogEntityRepository');
  });

  it('should get all films', async () => {
    const result: FilmCatalogEntity[] = [];
    (repo.find as jest.Mock).mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });

  it('should get a film', async () => {
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
    (repo.findOne as jest.Mock).mockResolvedValue(result);
    expect(await service.findOne('1')).toBe(result);
  });

  it('should create a film', async () => {
    const dto = new CreateFilmDto();
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
    (repo.save as jest.Mock).mockResolvedValue(result);
    expect(await service.create(dto)).toBe(result);
  });

  it('should update a film', async () => {
    const dto = new UpdateFilmDto();
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
    (repo.findOne as jest.Mock).mockResolvedValue(result);
    (repo.save as jest.Mock).mockResolvedValue(result);
    expect(await service.update('1', dto)).toBe(result);
  });

  it('should delete a film', async () => {
    const result = {
      raw: '',
      affected: 1,
    };
    const film: FilmCatalogEntity = {
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
    (repo.findOne as jest.Mock).mockResolvedValue(film);
    (repo.softDelete as jest.Mock).mockResolvedValue(result);
    expect(await service.remove('1')).toBe(result);
  });
});
