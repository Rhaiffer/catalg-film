import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth.module';
import { FilmCatalogModule } from './modules/film-catalog.module';
import { UsersModule } from './modules/users.module';
import { RedisModule } from './modules/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    FilmCatalogModule,
    RedisModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const logger = new Logger('AppModule');
    logger.log(`POSTGRES_HOST: ${process.env.POSTGRES_HOST}`);
    logger.log(`REDIS_HOST: ${process.env.REDIS_HOST}`);
  }
}
