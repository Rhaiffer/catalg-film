import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmCatalogController } from '../controllers/film-catalog/film-catalog.controller';
import { FilmCatalogEntity } from '../entity/film-catalog.entity';
import { FilmCatalogService } from '../services/film-catalog.service';
import { RedisModule } from './redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([FilmCatalogEntity]), RedisModule],
  controllers: [FilmCatalogController],
  providers: [FilmCatalogService],
  exports: [FilmCatalogService],
})
export class FilmCatalogModule {}
