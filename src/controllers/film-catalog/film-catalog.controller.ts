import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FilmCatalogService } from '../../services/film-catalog.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Redis } from 'ioredis';

@ApiTags('Filmes')
@Controller('api/v1/film-catalog')
@UseGuards(AuthGuard('jwt'))
export class FilmCatalogController {
  constructor(
    private readonly filmeCatalogService: FilmCatalogService,
    @Inject('Redis') private readonly redis: Redis,
  ) {}

  @Get()
  async findAll() {
    const films = await this.redis.get('films');
    if (films) {
      return { data: JSON.parse(films), source: 'cache' };
    }

    const filmsFromService = await this.filmeCatalogService.findAll();
    await this.redis.setex('films', 60, JSON.stringify(filmsFromService)); // Expire após 60 segundos
    return { data: filmsFromService, source: 'database' };
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    const film = await this.redis.get(`film:${id}`);
    if (film) {
      return { data: JSON.parse(film), source: 'cache' };
    }

    const filmFromService = await this.filmeCatalogService.findOne(id);
    await this.redis.setex(`film:${id}`, 60, JSON.stringify(filmFromService)); // Expire após 60 segundos
    return { data: filmFromService, source: 'database' };
  }

  @Post()
  async create(@Body() body: CreateFilmDto) {
    const film = await this.filmeCatalogService.create(body);
    await this.redis.setex(`film:${film.id}`, 60, JSON.stringify(film)); // Expire após 60 segundos
    return film;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateFilmDto,
  ) {
    const updatedFilm = await this.filmeCatalogService.update(id, body);
    await this.redis.setex(
      `film:${updatedFilm.id}`,
      60,
      JSON.stringify(updatedFilm),
    ); // Expire após 60 segundos
    return updatedFilm;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.filmeCatalogService.remove(id);
    await this.redis.del(`film:${id}`);
    return { message: 'Filme excluído com sucesso' };
  }
}
