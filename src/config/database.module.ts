import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { dirname } from 'path';

dotenv.config();

const isDocker = process.env.DOCKER;
const dbHost = isDocker
  ? process.env.POSTGRES_HOST_DOCKER
  : process.env.POSTGRES_HOST;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbHost,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [dirname(__dirname) + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
export class DatabaseModule {}
